// src/routes/Routes.jsx

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import ForgetPassword from "../pages/ForgetPassword";
import ToyDetails from "../pages/ToyDetails";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";
import AllToys from "../pages/allToys";
import Feedback from "../pages/Feedback";
import About from "../pages/About";

// Note: This URL points to the local JSON file.
const TOYS_DATA_URL = "/toys.json"; 

// Central Loader function to fetch all toys data
const allToysLoader = async () => {
    
    // API Call: Fetches data from the local JSON file (or your live API)
    const response = await fetch(TOYS_DATA_URL); 

    if (!response.ok) {
        throw new Error("Failed to fetch all toys data.");
    }
    
    const allToysData = await response.json();
    return allToysData; 
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
                // Loader for the Home Page
                loader: allToysLoader, 
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/forget-password",
                element: <ForgetPassword />,
            },
            
            // ----------------------------------------------------
            // Protected Routes
            // ----------------------------------------------------
            {
                path: "/my-profile",
                element: <ProtectedRoute><Profile /></ProtectedRoute>,
            },
            {
                path: "/toy/:id",
                element: <ProtectedRoute><ToyDetails /></ProtectedRoute>,
                // Loader for Toy Details
                loader: allToysLoader, 
            },
            
            // All Toys Page
            {
                path: "/all-toys",
                element: <AllToys />,
                loader: allToysLoader,
            },
            
            {
                path: "/feedback",
                element: <ProtectedRoute><Feedback></Feedback></ProtectedRoute> 
            },
            {
                path: "/about",
                element: <About></About>
            },
        ],
    },
]);

export default router;