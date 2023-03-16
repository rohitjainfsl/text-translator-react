import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./context/Home";
import Header from "./contextHeader";
import About from "./contextAbout";
import SingleBlog from "./contextSingleBlog";
import axios from "axios";
import Register from "./context/Register";
import Login from "./context/Login";

export const Ecommercecontext = createContext(null);

function App() {
  const [data, setData] = useState([]);
  const [form, setFormDetails] = useState([]);

  useEffect(() => {
    async function fatchData() {
      let response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?limit=10"
      );
      console.log(response.data);
      setData(response.data);
    }

    fatchData();
  }, []);

  return (
    <Ecommercecontext.Provider value={{ data, setData, form, setFormDetails }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/blog/:id" element={<SingleBlog />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </Ecommercecontext.Provider>
  );
}

export default App;
