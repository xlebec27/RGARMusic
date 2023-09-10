import {Outlet, Navigate} from 'react-router-dom'

export function PrivateRoutes(){

    return(
        localStorage.getItem('isAdmin') ? <Outlet/> : <Navigate to='/profile'/>
    )
}