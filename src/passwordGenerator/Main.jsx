import { useState } from "react";

function Main() {
  document.title = "Password Generator";

  const sources = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[{]}?/>.<",
  };

  const [strength, setStrength] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [generatedPassword, setGeneratedPassword] = useState("");

  const [passwordLength, setPasswordLength] = useState(8);

  function handleOptionChange(e) {
    const value = e.target.value;
    setStrength({ ...strength, [value]: !strength[value] });
    setGeneratedPassword("");
  }
  function generatePassword() {
    let passwordSource = "";
    for (let option in strength) {
      if (strength[option]) passwordSource += sources[option];
    }
    console.log(passwordSource);

    let output = "";
    for (let i = 0; i < passwordLength; i++) {
      output +=
        passwordSource[Math.floor(Math.random() * passwordSource.length)];
    }
    setGeneratedPassword(output);
  }

  function copyGeneratedPassword() {
    navigator.clipboard.writeText(generatedPassword);
    alert("Password copied to cliboard");
  }

  return (
    <>
      <h1>Password Generator</h1>

      <div id="generator">
        <input type="text" disabled value={generatedPassword} />
        <button onClick={copyGeneratedPassword}>Copy</button>
        <div className="length">
          <p>Select Password Length (8 - 50 characters)</p>
          <input
            type="number"
            placeholder="Enter length"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
        </div>
        <div className="options">
          <input
            type="checkbox"
            name="option"
            value="uppercase"
            checked={strength.uppercase}
            onChange={handleOptionChange}
          />
          Include Upper Case
          <input
            type="checkbox"
            name="option"
            value="lowercase"
            checked={strength.lowercase}
            onChange={handleOptionChange}
          />
          Include Lower Case
          <input
            type="checkbox"
            name="option"
            value="numbers"
            checked={strength.numbers}
            onChange={handleOptionChange}
          />
          Include Numbers
          <input
            type="checkbox"
            name="option"
            value="symbols"
            checked={strength.symbols}
            onChange={handleOptionChange}
          />
          Include Symbols
        </div>

        <button onClick={generatePassword}>Generate Password</button>
      </div>
    </>
  );
}

export default Main;
