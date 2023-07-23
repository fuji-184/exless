import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'


const Article = () => {
  
  const { title } = useParams()
  
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{
    fetchData()
    console.log(title)
  }, [])
  
  useEffect(()=>{
    console.log(data)
  }, [data])
  
  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${title}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const resData = await response.json();
      const newData = Object.values(resData)[0];
      setData(newData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }
  
  if (loading) {
    return (<div>Loading...</div>);
  }
  
  if (!data) {
    return (<div>Data not found</div>);
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
