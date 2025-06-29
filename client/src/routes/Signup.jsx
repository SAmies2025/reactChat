import { useNavigate } from "react-router";
import { Link } from "react-router";
import { useState } from 'react';

export default function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [showSignInLink, setShowSignInLink] = useState(false);
    
    async function handleSignUp(event) {
        try {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/signup`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Object.fromEntries(formData))
            });
            
            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('sessionToken', result.sessionToken);
                alert(`You have successfully created an account!`);
                navigate("/");
            } else {
                if (result.error === 'User already exists') {
                    console.log(result.error)
                    setError(result.error);
                    // Show the Signin button          
                    setShowSignInLink(true); 
                } else {
                setError(result.error || 'Signup failed');
                setShowSignInLink(false);
                }
            }
        } catch (err) {
            setError(`Error: ${err}`);
        }
    } 

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <input type="text" name="firstName" placeholder="First Name" required/>
                <input type="text" name="lastName" placeholder="Last Name" required/>
                <input type="email" name="email" placeholder="email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Sign Up</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
              
            {/* Conditionally show sign in link */}
            {showSignInLink && (
                <div>
                    <p>Please try again or sign in if you already have an account.</p>
                    <Link to="/signin">
                        <button>Sign In</button>
                    </Link>
                </div>
            )}
        </>
    );
}