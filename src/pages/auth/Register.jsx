import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Background from "../../assets/bglogin.jpg"
import User from "../../../public/icons/user.svg"
import FormInput from "../../utilities/FormInput"
import Button from "../../utilities/Button"

const Register = () => {
  
  const navigate = useNavigate()
  
  useEffect(()=>{
    if (localStorage.getItem('token')){
    navigate(`/dashboard`, { replace: true });
    }
    if (localStorage.getItem('user')){
    navigate(`/`, { replace: true });
    }
    }, [])
  
  
  const [formData, setFormData] = useState({});
  const [ data, setData ] = useState()
  
  
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  
  const handleLogin = async (e) => {
    e.preventDefault()
    
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then((res) => res.json())
    .then((data) => {
      
      setData(data)
      //localStorage.setItem('token', data.token);
      if (data.idUser){
      localStorage.setItem('idUser', data.idUser);
      }
      if (data.emailUser){
      localStorage.setItem('emailUser', data.emailUser);
      }
      if (data.user){
      localStorage.setItem('user', data.user);
      }
      if (localStorage.getItem('token')){
      navigate(`/dashboard`, { replace: true });
      }
      if (localStorage.getItem('user')){
      navigate(`/`, { replace: true })}
    })
  }
  
    return(
        <div>
            <img src={Background} className="h-screen w-full object-cover z-0" alt="" />
            <div className="h-screen w-full bg-white/40 absolute top-0 z-50 flex justify-center items-center">
                <div className="w-[500px] h-fit bg-[#1A4D2E] rounded-3xl text-white flex flex-col items-center justify-start p-8 gap-4">
                    <h1 className="font-semibold text-4xl">REGISTER</h1>
                    <img src={User} height={115} width={115} alt="user" />
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <FormInput name='email' type='input' id='email' title='Email' onChange={handleChange} />
                        <FormInput name='password' type='password' id='password' title='Password' onChange={handleChange} />
                        <div className="w-full flex justify-center">
                            <Button text='REGISTER' color='outline outline-white outline-1 w-[150px] rounded-xl' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register