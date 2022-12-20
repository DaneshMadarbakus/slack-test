import React, { useState } from "react";

const Homepage = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState({});
  const [channel, setChannel] = useState([]);

  const sendSlackMessage = async () => {
    const response = await fetch("http://localhost:8001/send-message", {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ message, channel, workspaceUrl: selectedWorkspace.url })
    });

    console.log("sendSlackMessage response: ", response);
  }

  const login = async () => {
    const response = await fetch("http://localhost:8001/login", {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email })
    });

    console.log("login response: ", response);
  }

  const confirmEmail = async () => {
    // console.log("Confirm email", code, email)
    try {
      await fetch("http://localhost:8001/confirm-email", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({ code, email })
      });

      const workspaces = await fetch("http://localhost:8001/workspaces", {
        headers: { "Content-type": "application/json" }
      });

      console.log("workspace 1", workspaces);

      const workspacesJSON = await workspaces.json();

      console.log("workspace 2", workspacesJSON);

      setWorkspaces(workspacesJSON.workspaces);
      console.log(workspacesJSON.workspaces);
    } catch (err) {
      console.log("ERROR", err)
    }
  }

  const joinWorkspace = async () => {
    const response = await fetch("http://localhost:8001/join-workspace", {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ magicUrl: selectedWorkspace.magicUrl, url: selectedWorkspace.url, magicLoginCode: selectedWorkspace.magicLoginCode })
    });
    console.log("Danesh enterWorkspace", response);
  }

  return <main style={{
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }}>
    <h1 style={{ margin: 0 }}>Slack Magic</h1>

    <input type="text" onChange={(e) => { setEmail(e.target.value) }} />
    <button
      style={{
        cursor: "pointer"
      }}
      onClick={() => {
        login(email)
      }}>SET EMAIL</button>

    <input type="text" onChange={(e) => { setCode(e.target.value) }} />
    <button
      style={{
        cursor: "pointer"
      }}
      onClick={() => {
        confirmEmail()
      }}>ENTER CODE</button>

    {workspaces.map(x => {
      return (<button onClick={() => setSelectedWorkspace(x)} key={`${x.name}`}>{x.name}</button>)
    })}

    {selectedWorkspace.name ? <p>You are in the {selectedWorkspace.name} workspace</p> : null}
    <button
      style={{
        cursor: "pointer"
      }}
      onClick={() => {
        joinWorkspace()
      }}>JOIN WORKSPACE</button>

    <label>
      Enter channel to message
      <input type="text" onChange={(e) => { setChannel(e.target.value) }} />
    </label>


    <input type="text" onChange={(e) => { setMessage(e.target.value) }} />
    <button
      style={{
        cursor: "pointer"
      }}
      onClick={() => {
        sendSlackMessage()
      }}>SEND MESSAGE</button>
  </main>
}

export default Homepage;