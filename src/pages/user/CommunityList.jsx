import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const CommunityList = () => {
  
  const [ data, setData ] = useState([])
  
  useEffect(()=>{
    fetchData()
  }, [])
  
  useEffect(()=>{
    console.log(data)
  }, [data])
  
  const fetchData = async () => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/community`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((resData) => {
      console.log(resData)
       const newData = Object.keys(resData).map((id) => ({ ...resData[id], id }));
       setData(newData);
    })
    
  }
  
  const join = async (idUser, idCommunity) => {
    try {
      
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/community/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({idUser, idCommunity})
      })
      .then((res) => {
        const data = res.json()
        console.log(data)
      })
      
    } catch (err) {
      console.log('error : ' + err)
    }
  }

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl p-4 font-bold mb-4">Daftar Komunitas</h1>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((community, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg">
          <img
            src={community.foto}
            alt={community.nama}
            className="w-full h-32 object-cover mb-4 rounded-lg"
          />
          <h3 className="text-lg font-medium mb-2">{community.nama}</h3>
          <p className="text-gray-600 mb-4">{community.deskripsi}</p>
          <button
            onClick={() => join(localStorage.getItem('idUser'), community.id)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Join
          </button>
          <Link
            to={`/community/${community.id}`}
            className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            View
          </Link>
        </div>
      ))}
    </div>
    </div>
  );
};

export default CommunityList;
