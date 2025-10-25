import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';
import { FaUserCircle, FaSignOutAlt, FaSignInAlt, FaBars, FaHome, FaInfoCircle } from "react-icons/fa";

const Navbar = () => {
    const { user, logOut, loading } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success("Successfully logged out!");
            })
            .catch(error => {
                console.error(error);
                toast.error("Logout failed. Try again.");
            });
    }

    const navItems = (
        <>
            <li>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        isActive 
                            ? 'text-primary font-bold border-b-2 border-primary' 
                            : 'font-medium hover:text-primary transition-colors'
                    }
                >
                    <FaHome /> Home
                </NavLink>
            </li>
            
            {user && (
                <li>
                    <NavLink 
                        to="/my-profile" 
                        className={({ isActive }) => 
                            isActive 
                                ? 'text-primary font-bold border-b-2 border-primary' 
                                : 'font-medium hover:text-primary transition-colors'
                        }
                    >
                        <FaUserCircle /> My Profile
                    </NavLink>
                </li>
            )}

            <li>
                <NavLink 
                    to="/feedback" 
                    className={({ isActive }) => 
                        isActive 
                            ? 'text-primary font-bold border-b-2 border-primary' 
                            : 'font-medium hover:text-primary transition-colors'
                    }
                >
                    <FaInfoCircle /> Give Feedback
                </NavLink>
            </li>
        </>
    );

    return (
        
<div className="navbar bg-base-100 shadow-lg sticky top-0 z-50 px-4 md:px-8">
    <div className="navbar-start">
        <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <FaBars className="h-5 w-5" />
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                {navItems}
            </ul>
        </div>
        
        <Link to="/" className="text-2xl font-extrabold text-secondary hover:bg-transparent">
            Toy<span className="text-primary">Topia</span>
        </Link>
    </div>
    
    <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
            {navItems}
        </ul>
    </div>
    
    <div className="navbar-end space-x-3">
        {loading ? (
            <span className="loading loading-spinner text-primary"></span>
        ) : user ? (
            <div className="flex items-center space-x-3">
                <div className="tooltip tooltip-left" data-tip={user.displayName || user.email}>
                    <img 
                        src={user.photoURL || 'https://placehold.co/40x40/38bdf8/white?text=User'} 
                        alt="User Profile" 
                        className="w-10 h-10 rounded-full border-2 border-primary cursor-pointer object-cover" 
                    />
                </div>
                
                <button onClick={handleLogout} className="btn btn-error btn-secondary btn-sm text-white">
                    <FaSignOutAlt /> Logout
                </button>
            </div>
        ) : (
            <Link to="/login" className="btn btn-primary btn-sm flex items-center shadow-md hover:shadow-lg transition-shadow">
                <FaSignInAlt /> Login / Register
            </Link>
        )}
    </div>
</div>

    );
};

export default Navbar;