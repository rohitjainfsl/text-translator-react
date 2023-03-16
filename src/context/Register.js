import React, { useContext, useState, useEffect } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Ecommercecontext } from "../App";

function Register() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [user, setUser] = useState("");
  const { form, setFormDetails } = useContext(Ecommercecontext);

  useEffect(() => {
    localStorage.setItem("userDetails", JSON.stringify(form));
  }, [form]);
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(name,password,user,email)

    const userDetails = {
      name: name,
      email: email,
      user: user,
      password: password,
    };
    setFormDetails([
      ...form, userDetails
    ]);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <input
            type="text"
            placeholder="Create your username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          ></input>
        </div>
        <div>
          <input
            type="password"
            placeholder="Create your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <VisibilityOffIcon />
        </div>

        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </>
  );
}

export default Register;
