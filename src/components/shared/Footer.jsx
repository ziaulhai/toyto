import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaRegEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer p-10 bg-neutral text-neutral-content shadow-inner">
         <div className='grid grid-cols-1 md:grid-cols-3 justify-center items-center max-w-[1440px] mx-auto'>
            
            <nav>
                <header className="footer-title text-secondary">Toy Explorer</header>
              <div className='flex justify-center items-center gap-2'>
                <Link to="/" className="link link-hover">Home</Link>
                <Link to="/my-profile" className="link link-hover">My Profile</Link>
                <Link to="/feedback" className="link link-hover">Feedback</Link>
                <Link to="/login" className="link link-hover">Account Login</Link>
              </div>
                
            </nav> 
            
           
            <nav>
                <header className="footer-title text-secondary">Company Info</header> 
                
                 <div className='flex justify-center items-center gap-2'>
                <Link to="/about" className="link link-hover">About</Link>
                <Link to="/my-profile" className="link link-hover">Contact</Link>
               
              </div>
            </nav> 
            
           
                <div className='footer-center w-full pt-6'>
                <aside className='text-center'>
                    <p className="text-xl font-extrabold mb-2">
                        <span className='text-secondary'>Toy</span>Topia – Local Toy Store Platform
                    </p>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by ToyTopia Ltd.</p>
                    <div className="flex justify-center items-center gap-2 text-2xl mt-4">
                        {/* Social Media Icons */}
                        <a href="#"><FaFacebook className='hover:text-primary transition-colors duration-300'/></a>
                        <a href="#"><FaTwitter className='hover:text-primary transition-colors duration-300'/></a>
                        <a href="#"><FaInstagram className='hover:text-primary transition-colors duration-300'/></a>
                        <a href="#"><FaRegEnvelope className='hover:text-primary transition-colors duration-300'/></a>
                    </div>
                </aside>
            </div>
        </div>  
        </footer>
    );
};

export default Footer;


