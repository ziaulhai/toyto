import { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import useDynamicTitle from '../hooks/useDynamicTitle';
import { toast } from 'react-toastify';
import app from '../firebase/firebase.config';
import { FaLockOpen, FaEnvelope } from 'react-icons/fa';

const auth = getAuth(app);

const ForgetPassword = () => {
    
    useDynamicTitle("Reset Password");

    const navigate = useNavigate();
    const location = useLocation();
    
   
    const initialEmail = location.state?.email || '';
    const [email, setEmail] = useState(initialEmail);

    
    useEffect(() => {
        if (initialEmail) {
            setEmail(initialEmail);
        }
    }, [initialEmail]);


    const handlePasswordReset = (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email address.");
            return;
        }

       
        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success("Password reset link sent! Check your email inbox.");
                
               
                setTimeout(() => {
                    window.location.href = "https://mail.google.com/";
                }, 1000); 

            })
            .catch(error => {
                console.error(error);
               
                if (error.code === 'auth/user-not-found') {
                    toast.error("No user found with this email.");
                } else {
                    toast.error("Failed to send reset email. Please try again.");
                }
            });
    };


    return (
        <div className="hero min-h-[80vh] bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left p-6">
                    <h1 className="text-5xl font-extrabold text-primary mb-4 flex items-center justify-center lg:justify-start gap-2">
                        <FaLockOpen /> Forgot Password?
                    </h1>
                    <p className="py-6 text-gray-600 max-w-sm">
                        No worries! Enter your email address and we'll send you a link to reset your password instantly.
                    </p>
                </div>
                
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white">
                    <form onSubmit={handlePasswordReset} className="card-body">
                        
                       
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2 font-semibold">
                                    <FaEnvelope /> Email
                                </span>
                            </label>
                            <input 
                                type="email" 
                                placeholder="Registered Email Address" 
                                className="input input-bordered"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                        
                        
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                Reset Password
                            </button>
                        </div>
                        
                        
                        <div className="mt-4 text-center">
                            <Link to="/login" className="label-text-alt link link-hover text-sm text-secondary font-medium">
                                Back to Login
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;