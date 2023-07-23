import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import feature3 from "../../public/features3.png";

const Article = () => {
  
  const { judul } = useParams()
  
  const [ data, setData ] = useState()
  
  useEffect(()=>{
    fetchData()
  }, [])
  
  useEffect(()=>{
    console.log(data)
  }, [data])
  
  const fetchData = async () => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/${judul}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((resData) => {
      const newData = Object.values(resData)[0]
      setData(newData);
    })
    console.log(data)
  }
  
  if(!data){
    return (<div>Loading...</div>)
  }
  
  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center mt-10 mb-11">
        <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
        <p className="text-lg text-gray-700 text-justify" dangerouslySetInnerHTML={{ __html: data.content }} ></p>
      </div>
    </div>
  );
};

export default Article;
