import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        {
            path: '/',
            label: 'HOME',
            icon: '⚡',
            color: '#ff0055'
        },
        {
            path: '/skills',
            label: 'SKILLS',
            icon: '🎮',
            color: '#00ff88'
        },
        {
            path: '/projects',
            label: 'PROJECTS',
            icon: '🚀',
            color: '#00ccff'
        },
        {
            path: '/contact',
            label: 'CONTACT',
            icon: '📡',
            color: '#ff9900'
        },
    ];

    return (
        <motion.nav
            className={`cyber-navbar ${isScrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
        >
            <div className="container">
                <Link to="/" className="cyber-navbar__logo">
                    <motion.div
                        className="logo-container"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="logo-glitch" data-text="RAJ PATEL">RAJ PATEL</span>
                        <span className="logo-subtitle">GAME & WEB DEV</span>
                    </motion.div>
                </Link>

                {/* Desktop Menu */}
                <div className="cyber-navbar__desktop-menu">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`cyber-navbar__link ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            <motion.div
                                className="link-content"
                                whileHover={{
                                    scale: 1.1,
                                    textShadow: `0 0 8px ${item.color}`,
                                    boxShadow: `0 0 8px ${item.color}`,
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="link-icon">{item.icon}</span>
                                {item.label}
                                <span className="link-decoration"></span>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                    className={`cyber-navbar__mobile-toggle ${isMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="cyber-button-content">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </motion.button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="cyber-navbar__mobile-menu"
                            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
                            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
                            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={item.path}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        to={item.path}
                                        className={`cyber-navbar__mobile-link ${location.pathname === item.path ? 'active' : ''}`}
                                        onClick={() => setIsMenuOpen(false)}
                                        style={{ color: item.color }}
                                    >
                                        <span className="link-icon">{item.icon}</span>
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;