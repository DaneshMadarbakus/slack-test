import React, { useState } from "react";
import FormTextInput from "../components/FormTextInput/FormTextInput";

const Homepage = () => {
  const [email, setEmail] = useState("");
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState({});
  const [workspaceJoined, setWorkspaceJoined] = useState(false);
  const [channel, setChannel] = useState([]);

  const sendSlackMessage = async message => {
    await fetch("http://localhost:8001/send-message", {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ message, channel, workspaceUrl: selectedWorkspace.url })
    });
  }

  const login = async (emailAddress) => {
    setEmail(emailAddress);

    await fetch("http://localhost:8001/login", {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email: emailAddress })
    });
  }

  const confirmEmail = async code => {
    try {
      await fetch("http://localhost:8001/confirm-email", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({ code, email })
      });

      const workspaces = await fetch("http://localhost:8001/workspaces", {
        headers: { "Content-type": "application/json" }
      });

      const workspacesJSON = await workspaces.json();

      setWorkspaces(workspacesJSON.workspaces);
    } catch (err) {
      console.log("ERROR", err)
    }
  }

  const joinWorkspace = async () => {
    try {
      await fetch("http://localhost:8001/join-workspace", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({ magicUrl: selectedWorkspace.magicUrl, url: selectedWorkspace.url, magicLoginCode: selectedWorkspace.magicLoginCode })
      });

      setWorkspaceJoined(true);
    } catch (err) {
      console.log(err);
    }
  }

  return <main style={{
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }}>
    <h1>Slack Magic</h1>


    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <FormTextInput label={"Enter your email"} buttonFunc={login} buttonText={"Set e-mail"} name={"email"} />

      <FormTextInput label={"Enter the code sent to your email"} buttonFunc={confirmEmail} buttonText={"Enter code"} name={"code"} />

      {workspaces.length > 0 ? <div style={{ marginBottom: "15px" }}>
        <label htmlFor="workspace" style={{ display: "block", marginBottom: "5px" }}>Please select one of your workspaces</label>
        <select name="workspace" style={{ marginRight: "10px" }} onChange={e => { console.log("Danesh e: ", e.target.value); setSelectedWorkspace(JSON.parse(e.target.value)) }}>
          <option value="">Pick a workspace</option>
          {workspaces.map(workspace => {
            return (<option value={JSON.stringify(workspace)} key={`${workspace.name}`}>{workspace.name}</option>)
          })}
        </select>
        <button
          style={{
            cursor: "pointer"
          }}
          onClick={() => {
            joinWorkspace()
          }}
          disabled={!selectedWorkspace.name || workspaceJoined}>JOIN WORKSPACE</button></div> : null}

      {workspaceJoined ? <p style={{ fontWeight: "bold" }}>You are in the {selectedWorkspace.name} workspace</p> : null}

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Enter channel</label>
        <input type="text" onChange={(e) => { setChannel(e.target.value) }} />
      </div>

      <FormTextInput label={"Enter the message to send"} buttonFunc={sendSlackMessage} buttonText={"Send message"} name={"message"} />
    </div>
  </main >
}

export default Homepage;