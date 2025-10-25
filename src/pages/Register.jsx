import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaImage, FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useDynamicTitle from '../hooks/useDynamicTitle';
import { AuthContext } from '../providers/AuthProvider';

const Register = () => {
    useDynamicTitle("Register");
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [showPassword, setShowPassword] = useState(false); 
    
    const [error, setError] = useState('');

    const isLengthValid = password.length >= 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');

        if (!isLengthValid) {
            setError('Password must be at least 6 characters long.');
            toast.error('Password must be at least 6 characters long.');
            return;
        }
        if (!hasUppercase) {
            setError('Password must contain at least one uppercase letter (A-Z).');
            toast.error('Password must contain at least one uppercase letter (A-Z).');
            return;
        }
        if (!hasLowercase) {
            setError('Password must contain at least one lowercase letter (a-z).');
            toast.error('Password must contain at least one lowercase letter (a-z).');
            return;
        }

        createUser(email, password)
            .then(result => {
                updateUserProfile(name, photoUrl)
                    .then(() => {
                        toast.success(`Registration successful! Welcome, ${name || result.user.email}!`);
                        navigate('/');
                    })
                    .catch(profileError => {
                        console.error("Profile update failed:", profileError);
                        toast.warn("Account created, but could not update profile picture/name.");
                        navigate('/');
                    });
            })
            .catch(authError => {
                console.error("Authentication failed:", authError);
                if (authError.code === 'auth/email-already-in-use') {
                    setError('This email is already registered. Please login.');
                } else {
                    setError('Registration failed. Please check your network or try again.');
                }
            });
    };


    return (
        <div className="hero min-h-[90vh] bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-2xl font-extrabold text-secondary mb-2 flex items-center justify-center gap-2">
                        <FaUserPlus /> Join ToyTopia!
                    </h1>
                    <p className="py-2 text-gray-600 text-sm">Create your account to unlock all features.</p>
                </div>
                
                <div className="card shrink-0 w-full max-w-md shadow-2xl bg-white">
                    <form onSubmit={handleRegister} className="card-body">
                        
                        {error && (
                            <div role="alert" className="alert alert-error text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2 font-semibold">
                                    <FaUser /> Your Name
                                </span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Full Name" 
                                className="input input-bordered"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2 font-semibold">
                                    <FaImage /> Photo URL
                                </span>
                            </label>
                            <input 
                                type="url" 
                                placeholder="Paste Image Link (Optional)" 
                                className="input input-bordered"
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                            />
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2 font-semibold">
                                    <FaEnvelope /> Email
                                </span>
                            </label>
                            <input 
                                type="email" 
                                placeholder="Email address" 
                                className="input input-bordered"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2 font-semibold">
                                    <FaLock /> Password
                                </span>
                            </label>
                            
                            <div className="relative">
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    placeholder="Minimum 6 characters" 
                                    className="input input-bordered w-full pr-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                                <span 
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 hover:text-secondary"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            
                            <div className="mt-2 space-y-1 text-sm">
                                <p className={isLengthValid ? 'text-success' : 'text-error'}>
                                    {isLengthValid ? '✅' : '❌'} Minimum 6 characters
                                </p>
                                <p className={hasUppercase ? 'text-success' : 'text-error'}>
                                    {hasUppercase ? '✅' : '❌'} At least one uppercase (A-Z)
                                </p>
                                <p className={hasLowercase ? 'text-success' : 'text-error'}>
                                    {hasLowercase ? '✅' : '❌'} At least one lowercase (a-z)
                                </p>
                            </div>
                        </div>
                        
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-secondary btn-block">
                                Register
                            </button>
                        </div>

                        <div className="mt-6 text-center">
                            <p>
                                Already have an account? 
                                <Link to="/login" className="link link-hover text-primary font-bold ml-2">
                                    Login Here
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;