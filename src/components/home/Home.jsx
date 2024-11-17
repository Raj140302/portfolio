import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const skills = [
        "JavaScript", "Phaser", "React", "Three.js", "Pixi.js", "WebGL", "Babylon.js"
    ];

    const projects = [
        {
            title: "Cyber Quest",
            type: "Game Development",
            tech: "Phaser / Three.js",
            image: "/images/project1.jpg"
        },
        {
            title: "Matrix Portfolio",
            type: "Web Development",
            tech: "React / Three.js",
            image: "/images/project2.jpg"
        },
        {
            title: "AR Experience",
            type: "Mixed Reality",
            tech: "Three.js / AR Kit",
            image: "/images/project3.jpg"
        }
    ];

    return (
        <div className="home-container">
            <section className="hero">
                <div className="cyber-grid">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="grid-item"
                            style={{
                                transform: `rotate(${Math.atan2(
                                    mousePosition.y - window.innerHeight / 2,
                                    mousePosition.x - window.innerWidth / 2
                                ) * (180 / Math.PI)
                                    }deg)`
                            }}
                        />
                    ))}
                </div>

                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="glitch-text" data-text="RAJ PATEL">RAJ PATEL</h1>
                    <div className="title-container">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            GAME DEVELOPER
                        </motion.h2>
                        <motion.h2
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            WEB CREATOR
                        </motion.h2>
                    </div>

                    <motion.p
                        className="hero-description"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                    >
                        Crafting immersive digital experiences through code and creativity
                    </motion.p>

                    <div className="hero-buttons">
                        <motion.button
                            className="cyber-button primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.href = '/projects'}
                        >
                            View Projects
                        </motion.button>
                        <motion.button
                            className="cyber-button secondary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/contact')}
                        >
                            Contact Me
                        </motion.button>
                    </div>
                </motion.div>
            </section>

            {/* Skills Section */}
            <section className="skills-section">
                <h2 className="section-title">TECH STACK</h2>
                <div className="skills-container">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill}
                            className="skill-item"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{
                                scale: 1.1,
                                boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
                            }}
                        >
                            {skill}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Featured Projects */}
            <section className="projects-section">
                <h2 className="section-title">FEATURED MISSIONS</h2>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            className="project-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="project-image">
                                <img src={project.image} alt={project.title} />
                                <div className="project-overlay">
                                    <h3>{project.title}</h3>
                                    <p>{project.type}</p>
                                    <span className="tech-badge">{project.tech}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="cta-section">
                <motion.div
                    className="cta-content"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2>READY TO START A NEW QUEST?</h2>
                    <p>Let's create something amazing together</p>
                    <motion.button
                        className="cyber-button primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/contact')}
                    >
                        Initialize Contact
                    </motion.button>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;