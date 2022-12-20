import React, { useState } from "react";

const FormTextInput = ({ label, buttonFunc, buttonText, name }) => {
  const [input, setInput] = useState("");

  return <div style={{ marginBottom: "15px" }}>
    <label htmlFor={name} style={{ display: "block", marginBottom: "5px" }}>{label}</label>
    <input type="text" name={name} style={{ marginRight: "10px" }} onChange={(e) => { setInput(e.target.value) }} />
    <button
      style={{
        cursor: "pointer"
      }}
      onClick={() => {
        buttonFunc(input);
      }}>{buttonText}</button>
  </div>
}

export default FormTextInput;