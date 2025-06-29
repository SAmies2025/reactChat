import { useNavigate } from "react-router";
import { useState } from 'react';

export default function Signup() {
    const navigate = useNavigate();
    // const [error, setError] = useState('');
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
                alert(result.error || 'Signup failed');
                setShowSignInLink(false);
                navigate("/");
                }
            }
        } catch (err) {
            alert(`Error: ${err}`);
        }
    } 

    return (
        <div className='flex flex-col gap-2'>
            <h1 className="text-xl font-bold  m-2">Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <input type="text" class="input input-md m-2" name="firstName" placeholder="First Name" required/>
                <input type="text" class="input input-md m-2" name="lastName" placeholder="Last Name" required/>
                <input type="email" class="input input-md m-2" name="email" placeholder="email" required />
                <input type="password" class="input input-md m-2" name="password" placeholder="Password" required />
                <button type="submit" className='btn btn-primary'>Sign Up</button>
            </form>
        </div>
    );
}