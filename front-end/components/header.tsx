import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

    useEffect(() => {
        const user = sessionStorage.getItem("loggedInUser");
        setLoggedInUser(user);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("loggedInUser");
        setLoggedInUser(null);
    };

    return (
        <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
            <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
                {' '}
                Event App
            </a>
            <nav className="nav justify-content-center">
                <Link href="/" className="nav-link px-4 fs-5 text-white">
                    Home
                </Link>
                <Link href="/events" className="nav-link px-4 fs-5 text-white">Events</Link>
                <Link href="/venues" className="nav-link px-4 fs-5 text-white">Venues</Link>
                <div>
                {loggedInUser ? (
                <>
                <div className="px-4 text-white text-xl rounded-lg flex-right flex-initial mr-0 flex-initial text-right">
                Welcome, {loggedInUser}!
                </div>
                <button
                onClick={handleLogout}
                className="nav-link px-4 fs-5 text-white"
                >
                Logout
                </button>
                </>
                ) : (
                <>
                <Link
                href="/login"
                className="nav-link px-4 fs-5 text-white">
                Login
                </Link>
                </>
            )}
            </div>
            </nav>
        </header>
    );
};

export default Header;
