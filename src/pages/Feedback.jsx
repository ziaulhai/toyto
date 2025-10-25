import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaCommentAlt, FaLink, FaPaperPlane } from 'react-icons/fa';
import useDynamicTitle from '../hooks/useDynamicTitle';
import { AuthContext } from '../providers/AuthProvider';


const Feedback = () => {
    useDynamicTitle("Submit Feedback");
    const { user } = useContext(AuthContext);

    const [productUrl, setProductUrl] = useState('');
    const [feedbackText, setFeedbackText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmitFeedback = (e) => {
        e.preventDefault();
        setError('');

        if (!user) {
            setError("You must be logged in to submit feedback.");
            return;
        }

        if (!productUrl || !feedbackText) {
            
        }

        setLoading(true);

        new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true }); 
            }, 1500);
        })
        .then(data => {
            if (data.success) {
                toast.success('Feedback submitted successfully! Thank you. 😊');
                
                setProductUrl('');
                setFeedbackText('');
                setError(''); 
            }
        })
        .catch(err => {
            console.error('Unexpected Submission error:', err);
            setError('An unexpected error occurred during the process.');
            toast.error('Could not complete submission due to a program error.');
        })
        .finally(() => {
            setLoading(false);
        });
        
    };

    if (!user) {
        return (
            <div className="hero min-h-[85vh] bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-4xl font-bold text-red-500 mb-4">Access Denied! 🛑</h1>
                        <p className="py-6 text-lg">
                            Sorry, only registered and logged-in users can submit feedback. Please 
                            <Link to="/login" className="text-primary font-bold link link-hover mx-1">Login</Link> 
                            or 
                            <Link to="/register" className="text-secondary font-bold link link-hover mx-1">Register</Link> 
                            to continue.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="hero min-h-[85vh] bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-2xl font-extrabold text-primary mb-2 flex items-center justify-center gap-2">
                        <FaCommentAlt /> Share Your Valuable Feedback
                    </h1>
                    <p className="py-2 text-gray-600">Help us improve your experience on ToyTopia!</p>
                </div>
                
                <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-white">
                    <form onSubmit={handleSubmitFeedback} className="card-body">
                        
                        {error && (
                            <div role="alert" className="alert alert-error text-white mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2 font-semibold">
                                    <FaLink /> Product URL
                                </span>
                            </label><br />
                            <input 
                                type="url" 
                                name="productUrl"
                                placeholder="e.g., https://toytopia.com/toy/123" 
                                className="input input-bordered placeholder:text-gray-500"
                                value={productUrl}
                                onChange={(e) => setProductUrl(e.target.value)}
                            />
                        </div>
                        
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text flex items-center gap-2 font-semibold">
                                    Feedback Text
                                </span>
                            </label><br />
                            <textarea 
                                name="feedback"
                                placeholder="Tell us about your recent experience or suggestion..." 
                                className="textarea textarea-bordered h-32 placeholder:text-gray-500 "
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                                required 
                            ></textarea>
                            
                            <label className="label pt-1 pb-0">
                                <span className="label-text-alt text-xs text-gray-500">
                                    Submitting as: **{user.email}**
                                </span>
                            </label>
                        </div>
                        
                        <div className="form-control mt-6">
                            <button 
                                type="submit" 
                                className="btn btn-primary btn-block"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner"></span> Submitting
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane /> Submit Feedback
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Feedback;