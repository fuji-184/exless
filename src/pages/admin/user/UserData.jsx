import React from 'react';
import { Link } from 'react-router-dom'
import PageTitle from '../../../utilities/PageTitle';
import Table from '../../../utilities/Table';
import AddButton from "../../../utilities/AddButton";

const UserData = () => {
  const url = 'http://localhost:3000/user';
  const method = 'GET';
  const contentType = 'application/json';
  
  const columns = ['displayName', 'email'];
  
  const handleViewLink = (id) => `/view/${id}`;
  const handleEditLink = (id) => `/data/artikel/edit/${id}`;
  
  const handleDeleteLink = async (id) => {
    try {
      await fetch(`http://localhost:3000/artikel/${id}`, {
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
      <PageTitle title="Data User" />
      <div className="bg-white flex justify-between py-3 gap-2 px-4">
        <Link to="/data/user/add">
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

export default UserData;
