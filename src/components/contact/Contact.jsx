import { motion } from 'framer-motion';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      // Reset after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: 'raj666361@gmail.com',
      link: 'mailto:raj666361@gmail.com'
    },
    {
      icon: '🐦',
      title: 'Twitter',
      value: '@rajpatel_dev',
      link: 'https://twitter.com/rajpatel_dev'
    }
  ];

  return (
    <div className="contact-page">
      {/* Animated Background */}
      <div className="cyber-grid">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="grid-item" />
        ))}
      </div>

      {/* Header Section */}
      <motion.section
        className="contact-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="glitch-text" data-text="INITIALIZE CONTACT">
          INITIALIZE CONTACT
        </h1>
        <p className="header-description">
          Ready to start a new project or just want to connect? Let's make it happen.
        </p>
      </motion.section>

      <div className="contact-content">
        {/* Contact Methods */}
        <motion.div
          className="contact-methods"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2>DIRECT CHANNELS</h2>
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.title}
              href={method.link}
              className="contact-method"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
              }}
            >
              <span className="method-icon">{method.icon}</span>
              <div className="method-info">
                <h3>{method.title}</h3>
                <p>{method.value}</p>
              </div>
              <span className="method-arrow">→</span>
            </motion.a>
          ))}

          {/* Social Links */}
          <div className="social-links">
            <h2>CONNECT</h2>
            <div className="social-grid">
              {['GitHub', 'LinkedIn', 'Instagram', 'YouTube'].map((platform, index) => (
                <motion.a
                  key={platform}
                  href={`https://${platform.toLowerCase()}.com/yourusername`}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {platform}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="contact-form-container"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2>SEND MESSAGE</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <motion.input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
                whileFocus={{ scale: 1.02 }}
              />
            </div>
            <div className="form-group">
              <motion.input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
                whileFocus={{ scale: 1.02 }}
              />
            </div>
            <div className="form-group">
              <motion.input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                value={formData.subject}
                onChange={handleChange}
                whileFocus={{ scale: 1.02 }}
              />
            </div>
            <div className="form-group">
              <motion.textarea
                name="message"
                placeholder="Your Message"
                required
                value={formData.message}
                onChange={handleChange}
                whileFocus={{ scale: 1.02 }}
              />
            </div>
            <motion.button
              type="submit"
              className={`submit-button ${isSubmitting ? 'loading' : ''} ${submitStatus ? submitStatus : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'SENDING...' : submitStatus ? 'SENT!' : 'SEND MESSAGE'}
              <span className="button-glow"></span>
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Location Section */}
      <motion.section
        className="location-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2>LOCATION</h2>
        <div className="location-content">
          <div className="location-info">
            <p>Ahmedabad, Gujarat</p>
            <p>India</p>
            <p>GMT+5:30</p>
          </div>
          <div className="map-container">
            {/* Add your map component here */}

            <div className="cyber-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235013.70717963495!2d72.43965651160628!3d23.020497766767986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1704821547943!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="google-map"
              />
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;