import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function SingleBlog() {
    const [Singleblog,setSingleBlog] = useState ({})
    const {id} = useParams()
    useEffect(()=>{ 
        async function clickdata(){
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        console.log(response)
        setSingleBlog(response.data)
    }
    clickdata()
},[])
   
  return (
    <div>
       <p>{Singleblog.body}</p>
       <h3>{Singleblog.title}</h3>
    </div>
  )
}

export default SingleBlog