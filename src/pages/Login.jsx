import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle, FaEnvelope, FaLock, FaSignInAlt, FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useDynamicTitle from '../hooks/useDynamicTitle';
import { AuthContext } from '../providers/AuthProvider';

const Login = () => {
    useDynamicTitle("Login");
    const { signIn, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        signIn(email, password)
            .then(result => {
                const user = result.user;
                toast.success(`Welcome back, ${user.displayName || user.email}!`);
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.error(err);
                if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
                    setError('Invalid email or password.');
                } else {
                    setError('Login failed. Please check your credentials.');
                }
            });
    };

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                toast.success(`Welcome back, ${user.displayName || 'User'}!`);
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.error(err);
                toast.error('Google login failed. Please try again.');
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    return (
        <div className="hero min-h-[85vh] bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-primary mb-2 flex items-center gap-2">
                        <FaSignInAlt /> Login to ToyTopia
                    </h1>
                    <p className="py-2 text-gray-600">Explore exclusive toys and offers!</p>
                </div>

                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white">
                    <form onSubmit={handleLogin} className="card-body">

                        {error && (
                            <div role="alert" className="alert alert-error text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2 font-semibold">
                                    <FaEnvelope /> Email
                                </span>
                            </label>
                            <input
                                type="email"
                                name="email"
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
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className="input input-bordered w-full pr-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>

                            <label className="label">
                                <Link
                                    to="/forget-password"
                                    state={{ email: email }}
                                    className="label-text-alt link link-hover text-sm text-secondary font-medium"
                                >
                                    Forgot password?
                                </Link>
                            </label>
                        </div>

                        <div className="form-control mt-4">
                            <button type="submit" className="btn btn-primary btn-block">
                                Login
                            </button>
                        </div>

                        <div className="divider text-gray-400">OR</div>

                        <div className="form-control">
                            <button type="button" onClick={handleGoogleLogin} className="btn btn-primary btn-neutral btn-block">
                                <FaGoogle className='text-xl text-white' /> Login with Google
                            </button>
                        </div>

                        <div className="mt-6 text-center">
                            <p>
                                Don't have an account?
                                <Link to="/register" className="link link-hover text-secondary font-bold ml-2 flex items-center justify-center gap-1">
                                    <FaUserPlus className='text-sm' /> Register Now
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;