import { Link } from "react-router";

export default function Home() {
    return (
        <>
        <h1>Welcome to React Chat!</h1>
            <header>
                {localStorage.getItem('sessionToken') ? <>
                Hi User
                <button onClick={localStorage.removeItem('sessionToken')}>LogOut</button>
                
                </> : (
                    <div>
                    <Link to="/signup">
                    <button>Sign Up</button>
                    </Link>
                    <h2>Already a Member?</h2>
                    <Link to="/signin">
                    <button>Sign In</button>
                    </Link>
                    </div>
                )}
            </header>
        </>
    )
}