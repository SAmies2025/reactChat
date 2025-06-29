import { useState, useRef } from 'react';

export default function Auth({ setToken }) {
    // true = login, false = signup
    const [error, setError] = useState('');
    const [isLogin, setIsLogin] = useState(true); 
    const [isLoading, setIsLoading] = useState(false);
    
    // Create refs for easy form inputs
    const formRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Collect form data on submit
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        const endpoint = isLogin ? '/signin' : '/signup';
        const bodyData = isLogin 
            ? { email: data.email, password: data.password }
            : data;

        try {
            const response = await fetch(`http://localhost:3000${endpoint}`, {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            });

            const responseData = await response.json();

            if (responseData.sessionToken) {
                localStorage.setItem('token', responseData.sessionToken);
                // Update App.jsx state
                setToken(responseData.sessionToken); 
            }
            else {
                setError('Authentication failed');
            }
        } catch (err) {
            console.log(err);
            setError('Network error.');
        } finally {
            setIsLoading(false);
        }
    };

    //Lets you change between Signin and Signup
    const toggleIsLogin = () => {
        setIsLogin(!isLogin);
        setError('');
        // Clear the form when switching modes
        if (formRef.current) {
            formRef.current.reset();
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            
            <form ref={formRef} onSubmit={handleSubmit}>
                {/* Conditional rendering: Show first/last name only for signup Used instead of {!isLogin ? <SomeComponent /> : null}*/}
                {!isLogin && (
                    <>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            required
                        />
                    </>
                )}
                
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                />
                
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                />
                
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
                </button>
            </form>

            {error && (
                <p style={{ color: 'red' }}>
                {typeof error === 'string' ? error : JSON.stringify(error)}
                </p>
            )}
            
            <button onClick={toggleIsLogin} type="button">
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
        </div>
    );
}