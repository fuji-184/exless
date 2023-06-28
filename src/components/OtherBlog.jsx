import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import feature3 from "../../public/feature1.jpg";

const OtherBlog = () => {
  
  const [ data, setData ] = useState([])
  
  useEffect(()=>{
    fetchData()
  }, [])
  
  const fetchData = async () => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/artikel`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((resData) => {
      const newData = Object.keys(resData).map((id) => ({ ...resData[id], id }));
      setData(newData);
    })
  }

  return (
    <div className=" min-h-screen p-8">
      <div className="container mx-auto ">
        <h1 className="text-3xl font-bold mb-4 text-center">Other Blogs</h1>
        {data.map((blog, i) => (
          <div key={i} className="flex mb-4 p-6 rounded-[20px] bg-[#D9D9D9] shadow-xl">
            <img className="w-1/4 mr-4 rounded-xl" src={blog.thumbnail} alt={blog.judul} />
            <div className="flex flex-col">
              <h2 className="text-xl font-bold mb-2">{blog.judul}</h2>
              <p className="text-gray-700 text-justify text-ellipsis overflow-hidden">{blog.ringkasan.length > 100
          ? `${blog.ringkasan.substring(0, 100)}...`
          : blog.ringkasan}</p>
              <Link to={`/${blog.judul}`}>
              <button className="bg-[#f48c06] text-white w-[100px] h-[40px] rounded-xl hover:bg-[#252641] text-white">
                  Read More
              </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherBlog;
