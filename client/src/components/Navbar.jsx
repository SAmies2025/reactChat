import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';

export default function Navbar() {
    const [token, setToken] = useState(localStorage.getItem('sessionToken'));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('sessionToken');
        setToken(null);
        navigate('/');
    };

    // Update navbar when localStorage changes (like after login)
    useEffect(() => {
        const checkToken = () => {
            setToken(localStorage.getItem('sessionToken'));
        };
        
        // Check for token changes every second (simple approach)
        const interval = setInterval(checkToken, 1000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50 left-0 right-0" > 
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost text-xl">
                    React Chat
                </Link>
            </div>
            
            <div className="navbar-end">
                {token ? (
                    <div className="flex gap-2 items-center">
                        <span className="text-sm">Welcome back!</span>
                        <button 
                            className="btn btn-primary btn-sm" 
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link to="/signin" className="btn btn-primary btn-sm">
                            Sign In
                        </Link>
                        <Link to="/signup" className="btn btn-pirmary btn-sm">
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}