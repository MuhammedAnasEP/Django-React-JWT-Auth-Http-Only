import useAuth from "../hooks/useAuth"
import { Navigate, Outlet, useLocation } from "react-router-dom"

// Middleware to prevent not authenticated user to access specific pages

export default function AuthMiddleware() {
    const { accessToken } = useAuth()
    const location = useLocation()

    return (accessToken ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />) // outlet will iinclude all componens, However navigate will redirect to home page

}