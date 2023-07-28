import React from 'react';
import { Link } from 'react-router-dom'
import PageTitle from '../../../utilities/PageTitle';
import Table from '../../../utilities/Table';
import AddButton from "../../../utilities/AddButton";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const CommunityData = () => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/community`
  const method = 'GET';
  const contentType = 'application/json';
  
  const columns = ['foto', 'nama', 'deskripsi'];
  
  const handleViewLink = (id) => `/view/${id}`;
  const handleEditLink = (id) => `/data/artikel/edit/${id}`;
  
  const handleDeleteLink = async (id) => {
  Swal.fire({
    title: 'Anda yakin?',
    text: 'Data akan dihapus permanen!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/community/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            // authorization: token ? `${token}` : '',
          },
        });

        Swal.fire({
          title: 'Sukses!',
          text: 'Operasi berhasil',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        
        window.location.reload()
      } catch (err) {
        Swal.fire({
          title: 'Gagal!',
          text: 'Terjadi kesalahan',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        console.log(err);
      }
    }
  });
};

  
  return (
    <>
      <PageTitle title="Data Komunitas" />
      <div className="bg-white flex justify-between py-3 gap-2 px-4">
        <Link to="/data/community/add">
          <AddButton/>
        </Link>
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

export default CommunityData;
