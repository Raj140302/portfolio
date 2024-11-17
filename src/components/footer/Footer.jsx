import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', icon: '💻', url: 'https://github.com/yourusername' },
    { name: 'LinkedIn', icon: '🔗', url: 'https://linkedin.com/in/yourusername' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com/yourusername' },
    { name: 'Discord', icon: '🎮', url: 'https://discord.gg/yourusername' }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <footer className="cyber-footer">
      <div className="cyber-grid">
        {/* Animated Background Grid */}
        {[...Array(20)].map((_, index) => (
          <div key={index} className="grid-item" />
        ))}
      </div>

      <div className="footer-content">
        <div className="footer-main">
          {/* Brand Section */}
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="glitch-text" data-text="RAJ PATEL">RAJ PATEL</h2>
            <p className="brand-description">
              Crafting digital experiences through code and creativity.
              Building the future of web and game development.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="footer-links"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="cyber-heading">Quick Access</h3>
            <ul className="quick-links">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 10, color: '#00ffff' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link to={link.path}>{link.name}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="footer-contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="cyber-heading">Initialize Contact</h3>
            <div className="contact-info">
              <p>📧 raj666361@gmail.com</p>
              <p>📱 +91 9510925075</p>
              <p>🌍 Ahmedabad, Gujarat</p>
            </div>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          className="social-links"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              whileHover={{
                scale: 1.2,
                boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)'
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="icon">{social.icon}</span>
              <span className="name">{social.name}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright Bar */}
        <div className="copyright-bar">
          <div className="copyright-text">
            <span className="cyber-symbol">⚡</span>
            <span>{currentYear} © RAJ PATEL. All rights reserved.</span>
            <span className="cyber-symbol">⚡</span>
          </div>
          <motion.button
            className="scroll-top"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ↑ INIT_SCROLL
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;