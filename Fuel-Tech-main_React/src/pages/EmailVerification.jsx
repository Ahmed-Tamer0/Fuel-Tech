import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

const EmailVerification = () => {
    const { t } = useLanguage();
    const [code, setCode] = useState(['', '', '', '', '', '']);

    const handleChange = (index, value) => {
        if (!/^[0-9]?$/.test(value)) return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto focus next input
        if (value && index < 5) {
            document.getElementById(`code-${index + 1}`).focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            document.getElementById(`code-${index - 1}`).focus();
        }
    };

    return (
        <AuthLayout title={t('verify_email')} subtitle={t('enter_code')}>
            <div className="verification-container">
                <div className="code-inputs-custom d-flex justify-content-between mb-4">
                    {code.map((digit, i) => (
                        <input
                            key={i}
                            id={`code-${i}`}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                            className="code-input"
                        />
                    ))}
                </div>
                <button className="btn-auth w-100 mb-4">{t('verify_code')}</button>
                <div className="text-center resend-section">
                    <p className="text-muted mb-2">{t('didnt_receive')}</p>
                    <button className="btn-resend border-0 bg-transparent text-primary fw-bold">{t('resend')}</button>
                </div>
                <div className="text-center mt-4">
                    <Link to="/login" className="back-to-login">
                        <i className="fa-solid fa-arrow-left me-2"></i> {t('back_to_login')}
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
};

export default EmailVerification;
