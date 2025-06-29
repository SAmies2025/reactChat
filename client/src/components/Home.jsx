export default function Home() {
    const token = localStorage.getItem('sessionToken');

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Welcome to React Chat!</h1>
                    {token ? (
                        <div className="py-6">
                            <p className="text-lg">Welcome back! Start chatting with your friends.</p>
                            <button className="btn btn-primary mt-4">
                                Enter Chat Rooms
                            </button>
                        </div>
                    ) : (
                        <div className="py-6">
                            <p className="text-lg">Connect with friends and start chatting today!</p>
                            <p className="text-sm opacity-70 mt-2">
                                Sign up or sign in using the buttons in the top menu.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}