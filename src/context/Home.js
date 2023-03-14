import axios from "axios";
import React, { useEffect,useContext } from "react";
import {Ecommercecontext} from '../App'
import { Link } from "react-router-dom";

function Home() {
  
    const {data, setData} =useContext(Ecommercecontext)

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
    <>
      <h1>Blog</h1>
      <div className="blogposts">
        {data.map((post) => {
          return (
            <div className="post" key={post.id}>
              <h3><Link to={`/Blog/${post.id}`}>{post.title}</Link></h3>
              <p>{post.body}</p>
            </div>
          )
        })}
      </div>
    </>
  );
}

export default Home;
