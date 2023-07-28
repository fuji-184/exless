import React from 'react';
import FormComponent from '../../../utilities/FormComponent';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../utilities/PageTitle';

const AddCommunity = () => {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    console.log('Form Data:', data);
      navigate(`/data/community`, { replace: true });
  };

  const method = 'POST';
  const contentType = 'application/json'
  const cekFile = false
  const gambar = true
  
  
  const url = `${import.meta.env.VITE_BACKEND_URL}/community`;
  const inputs = [
    { name: 'foto', label: 'Foto', type: 'file' },
    { name: 'nama', label: 'Nama', type: 'text' },
    { name: 'deskripsi', label: 'Deskripsi', type: 'text' }
  ];

  return (
    <div>
      <PageTitle title="Add Community" />
      <FormComponent method={method} url={url} inputs={inputs} onSubmit={handleSubmit} contentType={contentType} gambar={gambar} cekFile={cekFile} />
    </div>
  );
};

export default AddCommunity;
