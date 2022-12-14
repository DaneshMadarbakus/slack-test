import React, { useState } from "react";







const Homepage = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [workspaces, setWorkspaces] = useState([]);

  const sendSlackMessage = async () => {
    const response = await fetch("http://localhost:8001/send-message", {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ message })
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
    try {
      const response = await fetch("http://localhost:8001/confirm-email", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({ code, email })
      });

      console.log("confirmEmail response: ", response);

      const workspaces = await fetch("http://localhost:8001/workspaces",
        {
          headers: { "Content-type": "application/json" }
        });

      const workspacesJSON = workspaces.json()

      setWorkspaces(workspacesJSON);
      console.log(workspacesJSON);
    } catch (err) {
      console.log("ERROR", err)
    }
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
        confirmEmail(code)
      }}>ENTER CODE</button>

    <input type="text" onChange={(e) => { setMessage(e.target.value) }} />
    <button
      style={{
        cursor: "pointer"
      }}
      onClick={() => {
        sendSlackMessage(message)
      }}>SEND MESSAGE</button>

    {workspaces.length > 0 ? JSON.stringify(workspaces) : null}
  </main>
}

export default Homepage;