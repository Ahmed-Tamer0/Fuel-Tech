import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Hero = () => {
    const { t, language } = useLanguage();
    const [typedText, setTypedText] = useState('');
    const [count, setCount] = useState(0);
    const [indexT, setIndexT] = useState(0);

    const getTexts = () => [
        t('hero_typed1'),
        t('hero_typed2'),
        t('hero_typed3'),
        t('hero_typed4')
    ];

    useEffect(() => {
        const texts = getTexts();
        const current = texts[count % texts.length];

        if (indexT < current.length) {
            const timeout = setTimeout(() => {
                setTypedText(current.slice(0, indexT + 1));
                setIndexT(indexT + 1);
            }, 150);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setIndexT(0);
                setCount(count + 1);
            }, 1500);
            return () => clearTimeout(timeout);
        }
    }, [count, indexT, language]);

    return (
        <section className="hero">
            <div className="hero-bg-fx">
                <div className="blob"></div>
                <div className="blob"></div>
            </div>

            <div className="hero-container">
                <div className="hero-text">
                    <h1>Fuel<span> Tech</span></h1>
                    <p className="lead mb-4">{t('hero_subtitle')}</p>
                    <h2 className="hero-services">
                        <span id="typed-text">{typedText}</span>
                    </h2>
                    <Link to="/request-service" className="btn-service text-decoration-none">
                        <i className="bi bi-cart4"></i> <span>{t('order_now')}</span>
                    </Link>
                </div>

                <div className="hero-visual-3d">
                    <div className="speedometer-container">
                        <div className="speedometer">
                            <svg viewBox="0 0 300 300">
                                <circle cx="150" cy="150" r="120" className="ring-bg" />
                                <circle cx="150" cy="150" r="120" className="ring-active" strokeLinecap="round"
                                    transform="rotate(135, 150, 150)" />
                            </svg>
                            <div className="numbers">
                                <span>0</span>
                                <span>40</span>
                                <span>80</span>
                                <span>120</span>
                                <span>160</span>
                                <span>200</span>
                                <span>240</span>
                            </div>
                            <div className="needle-wrapper">
                                <div className="needle"></div>
                            </div>
                            <div className="center-knob"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
