import { useNavigate, useActionData, Form, useSubmit } from 'react-router-dom';
import { Button, Space, Input } from 'antd';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { axiosGet, axiosPost } from '../services/AxiosRequest';
// import { login } from '../lib/AxiosServices';



// export function LoginPage() {

//     const actionData = useActionData();
//     const navigate = useNavigate();
//     let submit = useSubmit();
//     const isLoggedIn = localStorage.getItem('refreshToken');
//     // const login = useAuthStore((state) => state.login);
//     useEffect(() => {
//         console.log('effect')
//         if (actionData?.tokens) {
//             login(actionData.tokens);
//             navigate("/home");
//         }
//     }, [actionData]);

//     if (isLoggedIn) {
//         navigate("/home");
//     }

//     // const login = () => {
//     //     navigate('/home');
//     // }

//     const register = () => {
//         navigate('/register');
//     }

//     return (
//         <Form method="post">
//             <Space direction="vertical" align="center" style={{ width: '98%' }}>
//                 <h1>Login</h1>
//                 <Input
//                     placeholder="Enter your username"
//                 //prefix={<UserOutlined className="site-form-item-icon" />}     TODO
//                 />
//                 <Input.Password placeholder="input password" />


//                     <button type="submit" shape="round" style={{ width: '100%' }}>Login</button>


//                 <Button  onClick={register} style={{ width: '100%' }}>
//                     Register
//                 </Button>
//             </Space>

//         </Form>
//     )
// }

export function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  function isEmpty(object) {
    for (var i in object) { return true; } return false;
  }

  // const useLogin = login

  const login = async () => {
    console.log(JSON.stringify({ email, password }))
    if (localStorage.getItem("refreshToken") !== null) {
      try {
        console.log("1");
        const response = await axios.post("http://localhost:8000/auth/jwt/refresh/",
          localStorage.getItem("refreshToken"),
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
        console.log(JSON.stringify(response.data));
        localStorage.setItem('refreshToken', response?.data?.refresh)
        localStorage.setItem('accessToken', response?.data?.access)  
        navigate("/home");
      } catch (error) {
        console.error(error);
      }
    }
    else {
      try {
        console.log("2");
        console.log(JSON.stringify({ email, password }))
        const response = await axios.post("http://localhost:8000/auth/jwt/create/",
          { email, password },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
        console.log(JSON.stringify(response.data));
        localStorage.setItem('refreshToken', response.data.refresh)
        localStorage.setItem('accessToken', response.data.access)  
        navigate("/home");
      } catch (error) {
        console.error(error);
      }
      
    }

  }

  // const buttonLogin = async () => {

  //   console.log(email, ' ', password)
  //   try {
  //     const response = await login(email, password)
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   navigate("/home");
  // }

  const register = () => {
    navigate('/register');
  }

  return (
    <div>
      <Space direction="vertical" align="center" style={{ width: '98%' }}>
        <h1>Login</h1>
        <Input
          placeholder="Enter your email" name="email"
          onChange={(e) => { setEmail(e.target.value) }}
        //prefix={<UserOutlined className="site-form-item-icon" />}     TODO
        />
        <Input.Password placeholder="input password" name="password" onChange={(e) => { setPassword(e.target.value) }} />


        <Button type="primary" onClick={login} shape="round" style={{ width: '100%' }}>Login</Button>


        <Button onClick={register} style={{ width: '100%' }}>
          Register
        </Button>
      </Space>

    </div>
  )
}

// import React, { useEffect } from "react";
// import { Form, useActionData, useNavigate } from "react-router-dom";
// import { useAuthStore } from "../lib/AuthStore";
// import { login, register } from "../lib/AxiosServices";

// export async function action({ request }) {
//   try {
//     let formData = await request.formData();
//     const type = formData.get("type");
//     const email = formData.get("email");
//     const password = formData.get("password");
//     const response = type === "register" ? await register({email, password}) : await login({email, password});
//     const { accessToken, refreshToken } = response.data;
//     localStorage.setItem('refreshToken', refreshToken)
//     localStorage.setItem('accessToken', accessToken)
//     return { tokens: { accessToken, refreshToken }, error: null };
//   } catch (error) {
//     return {
//       error: error?.response?.data?.message || error.message,
//       tokens: null,
//     };
//   }
// }

// export function LoginPage() {
//   const actionData = useActionData();
//   const navigate = useNavigate();
//   const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
//   const login = useAuthStore((state) => state.login);
//   useEffect(() => {
//     if (actionData?.tokens) {
//       login(actionData.tokens);
//       navigate("/home");
//     }
//   }, [actionData]);

//   if (isLoggedIn) {
//     navigate("/home");
//   }

//   return (
//     <div>
//       <Form method="post">
//         <h1>Login</h1>
//         {actionData?.error && <div className="alert">{actionData?.error}</div>}
//         <fieldset>
//           <label htmlFor="login">
//             <input
//               type="radio"
//               id="login"
//               name="type"
//               value="login"
//               defaultChecked
//             />
//             Login
//           </label>
//           <label htmlFor="register">
//             <input type="radio" id="register" name="type" value="register" />
//             Register
//           </label>
//         </fieldset>
//         <input
//           type="text"
//           name="email"
//           placeholder="Email"
//           aria-label="Email"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           aria-label="Password"
//           required
//         />

//         <button type="submit" className="contrast">
//           Login
//         </button>
//       </Form>
//     </div>
//   );
// }