import { Link } from "react-router-dom";  // No need for Navigate anymore
import { useState, useEffect } from "react";

const Header = () => {
    const [logout, setLogout] = useState(false);

    const logoutUser = (e: React.MouseEvent) => {
        e.preventDefault();
        localStorage.removeItem('token');
        setLogout(true);  // Set logout state to true
    };

    // Use useEffect to handle the redirect after logout state change
    useEffect(() => {
        if (logout) {
            // After logout state changes, navigate to login
            setTimeout(() => {
                window.location.href = '/login'; // Directly manipulate location to avoid issues
            }, 0);
        }
    }, [logout]);

    return (
        <>
            <header data-bs-theme="dark">
                <div className="collapse text-bg-dark" id="navbarHeader">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8 col-md-7 py-4">
                                <h4>About</h4>
                                <p className="text-body-secondary">
                                    This application provides an easy and efficient platform for people to list their cars for sale.
                                    It simplifies the process of creating posts, connecting with potential buyers, and managing car listings.
                                </p>
                            </div>
                            <div className="col-sm-4 offset-md-1 py-4">
                                <h4>Menu</h4>
                                <ul className="list-unstyled">
                                    <li><Link to="/" className="text-white">Home</Link></li>
                                    <li><Link to="/cars" className="text-white">View Listings</Link></li>
                                    <li><Link to="/carAdd" className="text-white">Sell Your Car</Link></li>

                                    <li><a href="#" onClick={logoutUser} className="text-white">Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navbar navbar-dark bg-dark shadow-sm">
                    <div className="container">
                        <Link to="/" className="navbar-brand d-flex align-items-center">
                            <strong>Avtonet</strong>
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
