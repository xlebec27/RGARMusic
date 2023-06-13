// import { createAxiosClient } from "./AxiosCreate";
// import {useNavigate} from 'react-router-dom';

// const REFRESH_TOKEN_URL = "http://localhost:8000/auth/jwt/refresh/"

// function getCurrentAccessToken() {
//     return localStorage.getItem("accessToken")
// }

// function getCurrentRefreshToken() {
//     return localStorage.getItem("refreshToken")
// }


// function setRefreshedTokens(tokens){
//     localStorage.setItem("accessToken", tokens.accessToken)
//     localStorage.setItem("refreshToken", tokens.refreshToken)
//     console.log('a= ',tokens.accessToken, '; r= ', tokens.refreshToken )
// }

// async function logout(){
//     let navigate = useNavigate();
//     localStorage.clear()
//     console.log('logout...')
//     navigate('/login')
// }

// export const client = createAxiosClient({
//     options: {
//         baseURL: "http://localhost:8000",
//         timeout: 300000,
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     },
//     getCurrentAccessToken,
//     getCurrentRefreshToken,
//     refreshTokenUrl: REFRESH_TOKEN_URL,
//     logout,
//     setRefreshedTokens
// })

import { createAxiosClient } from "./CreateAxiosClient";
import { useAuthStore } from "./AuthStore";

const BASE_URL = "http://localhost:8000"
const REFRESH_TOKEN_URL = "http://localhost:8000/auth/jwt/refresh/"

function getCurrentAccessToken() {
    return useAuthStore.getState().accessToken
}

function getCurrentRefreshToken() {
    return useAuthStore.getState().refreshToken
}


function setRefreshedTokens(tokens){
    const login = useAuthStore.getState().login
    console.log(tokens);
    login(tokens)
}

async function logout(){
    const logout = useAuthStore.getState().logout
    logout()
}

export const client = createAxiosClient({
    options: {
        baseURL: BASE_URL,
        timeout: 300000,
        headers: {
            'Content-Type': 'application/json',
        }
    },
    getCurrentAccessToken,
    getCurrentRefreshToken,
    refreshTokenUrl: REFRESH_TOKEN_URL,
    logout,
    setRefreshedTokens
})