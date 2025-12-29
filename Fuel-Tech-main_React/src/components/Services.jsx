import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Services = () => {
    const { t } = useLanguage();
    const [indexS, setIndexS] = useState(0);

    const slidesData = [
        {
            icon: 'bi-speedometer2',
            title: t('service_tires'),
            desc: t('service_tires_desc')
        },
        {
            icon: 'bi-shield-lock',
            title: t('service_fuel'),
            desc: t('service_fuel_desc')
        },
        {
            icon: 'bi-droplet-half',
            title: t('service_wash'),
            desc: t('service_wash_desc')
        },
        {
            icon: 'bi-lightning-charge',
            title: t('service_battery'),
            desc: t('service_battery_desc')
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndexS((prev) => (prev + 1) % slidesData.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slidesData.length]);

    const nextSlide = () => setIndexS((prev) => (prev + 1) % slidesData.length);
    const prevSlide = () => setIndexS((prev) => (prev - 1 + slidesData.length) % slidesData.length);

    return (
        <section className="services" id="services">
            <h2>{t('services')}</h2>
            <div className="services-container">
                <div className="services-layout">
                    <div className="slider-container">
                        <div className="slider">
                            {slidesData.map((slide, i) => {
                                let className = "slide";
                                if (i === indexS) className += " active";
                                else if (i === (indexS - 1 + slidesData.length) % slidesData.length) className += " prev";
                                else if (i === (indexS + 1) % slidesData.length) className += " next";

                                return (
                                    <div key={i} className={className}>
                                        <i className={`bi ${slide.icon}`}></i>
                                        <h3>{slide.title}</h3>
                                        <p>{slide.desc}</p>
                                        <Link to="/request-service" className="btn-service text-decoration-none">
                                            <i className="bi bi-cart4"></i> <span>{t('order_now')}</span>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="controls">
                            <button onClick={prevSlide}><i className="bi bi-chevron-left"></i></button>
                            <button onClick={nextSlide}><i className="bi bi-chevron-right"></i></button>
                        </div>
                    </div>

                    <div className="cube-wrapper">
                        <div className="cube">
                            <div className="cube-face face-front"><i className="bi bi-fuel-pump"></i></div>
                            <div className="cube-face face-back"><i className="bi bi-droplet-half"></i></div>
                            <div className="cube-face face-right"><i className="bi bi-lightning-charge"></i></div>
                            <div className="cube-face face-left"><i className="bi bi-gear-wide-connected"></i></div>
                            <div className="cube-face face-top"><i className="bi bi-speedometer2"></i></div>
                            <div className="cube-face face-bottom"><i className="bi bi-emoji-smile"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
