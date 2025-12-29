import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="auth-page">
            <div className="background-animation"></div>
            <div className="main-container d-flex align-items-center justify-content-center min-vh-100">
                <div className="auth-container p-4 p-md-5">
                    <div className="auth-header text-center mb-4">
                        <Link to="/" className="auth-logo text-decoration-none">
                            <h2>Fuel <span>Tech</span></h2>
                        </Link>
                        <h3 className="mt-3">{title}</h3>
                        <p className="text-muted">{subtitle}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
