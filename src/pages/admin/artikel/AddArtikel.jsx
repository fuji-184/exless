import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useNavigate } from 'react-router-dom';

const AddArtikel = () => {
  const navigate = useNavigate();
  const [content,setKonten] = useState('');
  const [title, setTitle] = useState('');
  const [description, setContent] = useState('');
  const [imageUrl, setThumbnail] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const handleImage = async (img) => {
    const formData = new FormData();
    formData.append('image', img);

    try {
      const response = await fetch('https://api.imgbb.com/1/upload?key=0cc61493cbf363a64718706827b5ec29', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      const imageUrl = data.data.display_url;
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
  
  const handleThumbnail = async (file) => {
    try {
      const imageUrl = await handleImage(file);
      setThumbnail(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  const handleImageUpload = async (file) => {
    setIsUploading(true);
    try {
      const imageUrl = await handleImage(file);
      const imageElement = `<img src="${imageUrl}" alt="Uploaded Image" style="max-width: 100%;">`;
      editorRef.current.focus();
      document.execCommand('insertHTML', false, imageElement);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    setIsUploading(false);
  };
  
  const handleSave = () => {
    const newsUrl = `${import.meta.env.VITE_FRONTEND_URL}/${encodeURIComponent(title)}`;
    const articleData = {
      title,
      description,
      imageUrl,
      newsUrl,
      content
    };
    
    console.log(articleData);

    fetch(`${import.meta.env.VITE_BACKEND_URL}/artikel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    })
      .then(response => response.json())
      .then(data => {
      Swal.fire({
      title: 'Sukses!',
      text: 'Operasi berhasil',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
        console.log('Article saved:', data);
        navigate(`/data/artikel`, { replace: true });
      })
      .catch(error => {
      Swal.fire({
      title: 'Gagal!',
      text: 'Terjadi kesalahan',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
        console.error('Error saving article:', error);
      });
  };

  const handleFormat = (format) => {
    editorRef.current.focus();
    document.execCommand(format, false, null);
  };
  
  return (
    <div className="p-4">
      <label>Judul</label>
      <input
        type="text"
        className="border border-gray-300 p-2 mb-4 w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Thumbnail</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleThumbnail(e.target.files[0])}
      />
      <label>Berita</label>
      <div className="border border-gray-300 p-2 mb-4 flex">
        <div className="flex items-center">
          <button
            className="bg-gray-200 px-2 py-1 rounded mr-2 hover:bg-gray-400"
            onClick={() => handleFormat('bold')}
          >
            Bold
          </button>
          <button
            className="bg-gray-200 px-2 py-1 rounded mr-2 hover:bg-gray-400"
            onClick={() => handleFormat('italic')}
          >
            Italic
          </button>
        </div>
        <div className="flex items-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-400"
            onClick={() => fileInputRef.current.click()}
          >
            Upload Gambar
          </button>
          {isUploading && <div className="animate-spin ml-2">&#9696;</div>}
        </div>
      </div>
      <div
        className="border border-gray-300 p-2 bg-white"
        contentEditable={true}
        ref={editorRef}
        onInput={(e) => setKonten(e.target.innerHTML)}
      ></div>
      <label>Deskripsi</label>
      <textarea
        className="border border-gray-300 p-2 mb-4 w-full"
        placeholder="Deskripsi"
        value={description}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="bg-blue-500 text-white py-2 px-4 mt-4" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default AddArtikel;
