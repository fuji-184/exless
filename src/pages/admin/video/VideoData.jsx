import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import PageTitle from '../../../utilities/PageTitle';
import Table from '../../../utilities/Table';
import AddButton from "../../../utilities/AddButton";

const VideoData = () => {
  
  const [authUrl, setAuthUrl] = useState('');
  
  useEffect(() => {
    const getAuthUrl = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/url`);
        const data = await response.json();
        setAuthUrl(data.url);
        console.log(authUrl)
      } catch (error) {
        console.error('Gagal mendapatkan URL otorisasi:', error);
      }
    };

    getAuthUrl();
  }, []);
  
  const url = `${import.meta.env.VITE_BACKEND_URL}/video`
  const method = 'GET';
  const contentType = 'application/json';
  
  const columns = ['thumbnail', 'title', 'description', 'videoUrl'];
  
  const handleViewLink = (judul) => `/view/${judul}`;
  const handleEditLink = (judul) => `/data/video/edit/${judul}`;
  
  const handleDeleteLink = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/video/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // authorization: token ? `${token}` : '',
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <PageTitle title="Data Video" />
      <div className="bg-white flex justify-between py-3 gap-2 px-4">
        <a href={authUrl}>
          <AddButton/>
        </a>
        <div className="flex items-center justify-center">
          <div className="relative">
            <input type="text" placeholder="Search Content" className="pl-10 pr-4 py-2 rounded-lg border border-slate border-opacity-50  focus:border-transparent" />
          </div>
        </div>
      </div>
      <Table columns={columns} handleViewLink={handleViewLink} handleEditLink={handleEditLink} handleDeleteLink={handleDeleteLink} contentType={contentType} method={method} url={url} />
    </>
  );
};

export default VideoData;
