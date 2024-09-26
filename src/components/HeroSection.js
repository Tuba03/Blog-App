// HeroSection.js
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => (
    <section className="hero-section">
        <div className="hero-content">
            <h1>Welcome to MyBlog</h1>
            <p>Your daily dose of insightful articles and stories.</p>
            <Link to="/explore" className="cta-button">Explore Articles</Link>
            <input type="text" placeholder="Search..." className="search-bar" />
        </div>
        {/* Add a carousel or featured posts here */}
    </section>
);

export default HeroSection;
