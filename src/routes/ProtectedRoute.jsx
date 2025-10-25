// src/routes/ProtectedRoute.jsx
// 'react-loader-spinner' ইম্পোর্টটি সরিয়ে দিন বা কমেন্ট করুন

import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
// import { Dna } from 'react-loader-spinner'; // <--- এটি কমেন্ট করুন বা মুছে দিন

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // 1. Show Loader when auth state is loading
    if (loading) {
        // Daisy UI loading spinner ব্যবহার করুন
        return (
            <div className='flex justify-center items-center min-h-[50vh]'>
                <span className="loading loading-spinner loading-lg text-primary"></span> 
            </div>
        );
    }

    // 2. Redirect to Login if no user is found
    if (user) {
        return children;
    }

    // Retain the intended path for redirection after successful login
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;