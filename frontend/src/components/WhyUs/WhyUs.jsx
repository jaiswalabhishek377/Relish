import React from 'react'
import './WhyUs.css'

const WhyUs = () => {
  const features = [
    {
      icon: '🚀',
      title: 'Lightning Express Delivery',
      desc: 'Smart logistics tracking ensuring orders arrive steaming hot in 30 mins or less.'
    },
    {
      icon: '💎',
      title: 'Uncompromised Quality',
      desc: 'Hand-picked partner restaurants maintaining 5-star hygiene and freshness standards.'
    },
    {
      icon: '💳',
      title: 'Safe Stripe Checkout',
      desc: 'Seamless end-to-end payment encryption supporting cards, Stripe, and instant checkout.'
    },
    {
      icon: '📊',
      title: 'Live Order Status',
      desc: 'Track your dish journey from preparation to out-for-delivery in real time.'
    }
  ]

  return (
    <div className="why-us" id="why-us">
      <div className="why-us-header">
        <span className="why-badge">WHY CHOOSE RELISH</span>
        <h2>Designed for Extraordinary Food Experiences</h2>
      </div>
      <div className="why-us-grid">
        {features.map((feat, index) => (
          <div className="why-card" key={index}>
            <div className="why-icon">{feat.icon}</div>
            <h3>{feat.title}</h3>
            <p>{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WhyUs
