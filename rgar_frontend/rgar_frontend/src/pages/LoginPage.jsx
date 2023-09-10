import { useNavigate } from 'react-router-dom';
import { Button, Space, Input, Row } from 'antd';
import React, { useState } from "react";
import axios from "axios";


export function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  function isEmpty(object) {
    for (var i in object) { return true; } return false;
  }


  const login = async () => {
    console.log(JSON.stringify({ email, password }))
    if (localStorage.getItem("refreshToken") !== null) {
      try {
        const response = await axios.post("http://localhost:8000/auth/jwt/refresh/",
          localStorage.getItem("refreshToken"),
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
        localStorage.setItem('refreshToken', response?.data?.refresh)
        localStorage.setItem('accessToken', response?.data?.access)  
        const profileData = await axios.get("http://localhost:8000/auth/users/me/",
          {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}
          }
        );
        localStorage.setItem('userID', profileData?.data?.id)
        navigate("/home");
      } catch (error) {
        console.error(error);
        localStorage.clear()
        const response = await axios.post("http://localhost:8000/auth/jwt/create/",
          { email, password },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
        localStorage.setItem('refreshToken', response.data.refresh)
        localStorage.setItem('accessToken', response.data.access)  
        const profileData = await axios.get("http://localhost:8000/auth/users/me/",
          {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}
          }
        );
        localStorage.setItem('userID', profileData?.data?.id)
        const adminData = await axios.get("http://localhost:8000/api/user/is-admin/",
          {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${response.data.access}`}
          }
        );
        localStorage.setItem('isAdmin', adminData?.data?.is_admin)
        navigate("/home");
      }
    }
    else {
      try {
        const response = await axios.post("http://localhost:8000/auth/jwt/create/",
          { email, password },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
        console.log(JSON.stringify(response.data));
        localStorage.setItem('refreshToken', response.data.refresh)
        localStorage.setItem('accessToken', response.data.access)  
        const profileData = await axios.get("http://localhost:8000/auth/users/me/",
          {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${response.data.access}`}
          }
        );
        localStorage.setItem('userID', profileData?.data?.id)
        const adminData = await axios.get("http://localhost:8000/api/user/is-admin/",
          {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${response.data.access}`}
          }
        );
        localStorage.setItem('isAdmin', adminData?.data?.is_admin)
        navigate("/home");
      } catch (error) {
        console.error(error);
      }
      
    }

  }


  const register = () => {
    navigate('/register');
  }

  return (
    <Row justify="center" style={{width:"100%"}} gutter={[16, 16]} size="large">
      <Space direction="vertical" style={{ textAlign: "center", paddingTop: "0px" }}>
        <h1 style={{paddingTop: "20px" }}>Login</h1>
        <Input
          placeholder="Enter your email" 
          onChange={(e) => { setEmail(e.target.value) }}
          size='100%'
        />
        <Input.Password placeholder="input password" name="password" onChange={(e) => { setPassword(e.target.value) }} />


        <Button type="primary" onClick={login} shape="round" style={{ width: '50%' }}>Login</Button>
          <br></br>
          Don't have an account?
        <Button onClick={register} style={{ width: '50%' }}>
          Register
        </Button>
      </Space>

    </Row>
  )
}
