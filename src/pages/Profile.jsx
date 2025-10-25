import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useDynamicTitle from '../hooks/useDynamicTitle';
import { toast } from 'react-toastify';
import { FaUserCircle, FaEnvelope, FaEdit } from 'react-icons/fa';

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    
    useDynamicTitle("My Profile");

    const [name, setName] = useState(user?.displayName || '');
    const [photoUrl, setPhotoUrl] = useState(user?.photoURL || '');
    const [isEditing, setIsEditing] = useState(false);

    const handleUpdateProfile = (e) => {
        e.preventDefault();

        updateUserProfile(name, photoUrl)
            .then(() => {
                toast.success("Profile updated successfully!");
                setIsEditing(false);
            })
            .catch(error => {
                console.error(error);
                toast.error(`Update failed: ${error.message}`);
            });
    };

    return (
        <div className="container mx-auto p-4 md:p-8 min-h-screen bg-base-100">
            <h1 className="text-4xl font-extrabold text-center text-primary mb-12 border-b-2 pb-4">
                My Profile Dashboard
            </h1>

            <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl p-6 md:p-12">
                
                <div className="flex flex-col md:flex-row items-center gap-8 border-b pb-8 mb-8">
                    <div className="avatar">
                        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="User Avatar" />
                            ) : (
                                <FaUserCircle className="w-full h-full text-gray-400" />
                            )}
                        </div>
                    </div>
                    
                    <div className="text-center md:text-left space-y-2">
                        <h2 className="text-3xl font-bold text-gray-800">{user?.displayName || 'User Name Not Set'}</h2>
                        <p className="text-lg text-gray-600 flex items-center justify-center md:justify-start gap-2">
                            <FaEnvelope className="text-secondary" /> {user?.email}
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                            Member since: {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                        </p>
                    </div>

                    <div className="md:ml-auto">
                        <button 
                            onClick={() => setIsEditing(!isEditing)} 
                            className="btn btn-secondary"
                        >
                            <FaEdit /> {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                        </button>
                    </div>
                </div>

                {isEditing && (
                    <div className="mt-8 p-6 border border-dashed border-primary rounded-lg bg-primary/5">
                        <h3 className="text-2xl font-bold text-primary mb-6 text-center">Update Your Details</h3>
                        <form onSubmit={handleUpdateProfile} className="space-y-6">
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Name</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Enter your new name" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="input input-bordered w-full" 
                                    required 
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Photo URL</span>
                                </label>
                                <input 
                                    type="url" 
                                    placeholder="Enter new photo URL" 
                                    value={photoUrl}
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                    className="input input-bordered w-full" 
                                />
                                <label className="label">
                                    <span className="label-text-alt">Paste a direct image link here.</span>
                                </label>
                            </div>

                            <div className="form-control mt-8">
                                <button type="submit" className="btn btn-primary w-full">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;