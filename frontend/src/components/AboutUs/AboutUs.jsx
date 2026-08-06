import React from 'react'
import './AboutUs.css'

const AboutUs = () => {
  return (
    <div className="about-us" id="about-us">
      <div className="about-us-header">
        <span className="about-badge">OUR STORY & MISSION</span>
        <h2>About Relish</h2>
        <p className="about-subtitle">
          Crafting exceptional culinary experiences with passion, speed, and uncompromising quality.
        </p>
      </div>

      <div className="about-content">
        <div className="about-story">
          <h3>Savor Every Moment, Delivered to Your Doorstep</h3>
          <p>
            At <strong>Relish</strong>, we believe food is more than just sustenance—it's an experience that brings people together. 
            Founded with a vision to revolutionize food delivery, Relish connects hungry foodies with top-rated local kitchens and master chefs.
          </p>
          <p>
            Whether you are craving crisp salads, gourmet burgers, authentic pasta, or decadent desserts, our platform ensures your meals arrive hot, fresh, and bursting with flavor—every single time.
          </p>
        </div>

        <div className="about-stats">
          <div className="stat-card">
            <h4>50+</h4>
            <p>Gourmet Dishes</p>
          </div>
          <div className="stat-card">
            <h4>30 Min</h4>
            <p>Avg. Delivery Time</p>
          </div>
          <div className="stat-card">
            <h4>10k+</h4>
            <p>Happy Customers</p>
          </div>
          <div className="stat-card">
            <h4>4.9 ★</h4>
            <p>Customer Rating</p>
          </div>
        </div>
      </div>

      <div className="about-pillars">
        <div className="pillar-card">
          <div className="pillar-icon">🥗</div>
          <h4>Fresh Ingredients</h4>
          <p>We partner exclusively with restaurants that source 100% fresh, premium quality ingredients daily.</p>
        </div>
        <div className="pillar-card">
          <div className="pillar-icon">⚡</div>
          <h4>Express Delivery</h4>
          <p>Our intelligent routing algorithm ensures your order reaches you at peak temperature and freshness.</p>
        </div>
        <div className="pillar-card">
          <div className="pillar-icon">🔒</div>
          <h4>Secure Checkout</h4>
          <p>Encrypted Stripe payment integration guarantees safe, seamless, and frictionless transactions.</p>
        </div>
        <div className="pillar-card">
          <div className="pillar-icon">👨‍🍳</div>
          <h4>Master Culinary Chefs</h4>
          <p>Curated menus created by passionate chefs to satisfy every craving and dietary preference.</p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
