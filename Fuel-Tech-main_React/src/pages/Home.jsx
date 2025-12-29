import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import FAQs from '../components/FAQs';
import Partners from '../components/Partners';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="home-page">
            <Hero />
            <Services />
            <FAQs />
            <Partners />
            <Footer />
        </div>
    );
};

export default Home;
