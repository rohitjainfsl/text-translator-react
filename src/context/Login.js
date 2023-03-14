import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  let [userName, setuserName] = useState("");
  let [password, setpass] = useState("");
  let [credentialsError, setCrendentialsError] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(localStorage.getItem(JSON.parse("userDetails")))

    const storedDetails = JSON.parse(localStorage.getItem("userDetails"));

    if (
      password === storedDetails.password &&
      userName === storedDetails.user
    ) {
      navigate("/");
    } else {
      setCrendentialsError("Invalid Credentials");
    }
  }
  return (
    <div>
      {credentialsError && <h1>{credentialsError}</h1>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setpass(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
