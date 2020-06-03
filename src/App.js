import React, { useState } from "react";
import schemaGenerator from "./schemaGenerator";
import "./styles.css";

export default function App() {
  const [txtObj, setTxtObj] = useState("");
  const [txtResult, setTxtResult] = useState("");

  const handleBtnClick = () => {
    if (!txtObj.trim()) {
      alert("No input yet!");
      return;
    }
    try {
      const parsed = JSON.parse(txtObj);
      const result = schemaGenerator(parsed);
      setTxtResult(result);
    } catch (e) {
      alert("Invalid JSON input. Please check your input");
    }
  };

  return (
    <div className="App">
      <h1>GraphQL Schema Generator</h1>
      <p>Input object (JSON)</p>
      <textarea
        value={txtObj}
        onChange={e => setTxtObj(e.target.value)}
        rows={5}
        placeholder="Input your object JSON"
      />
      <p>
        <button onClick={handleBtnClick}>Generate!</button>
      </p>
      <p>Result</p>
      <textarea value={txtResult} readOnly rows={10} placeholder="Result" />
      <p class="footer">
        Copyright &copy; 2020 <a href="https://vdanny.com">Vinsensius Danny</a>
      </p>
    </div>
  );
}
