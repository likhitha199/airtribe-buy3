import { Outlet, Navigate } from "react-router-dom"
export default function PrivateRoutes() {
    const isAuth = localStorage.getItem('airtribe-user-auth') ? true : false;
    return (
        isAuth ? <Outlet /> : <Navigate to="/login" />
    )
}