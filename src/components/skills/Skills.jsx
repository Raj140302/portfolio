import { motion } from 'framer-motion';
import { useState } from 'react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const skillCategories = [
    { id: 'all', label: 'ALL SKILLS' },
    { id: 'frontend', label: 'FRONTEND' },
    { id: 'backend', label: 'BACKEND' },
    { id: 'gamedev', label: 'GAME DEV' },
    { id: 'tools', label: 'TOOLS' }
  ];

  const skills = [
    {
      category: 'frontend',
      name: 'React.js',
      level: 80,
      icon: '⚛️',
      experience: '1 years',
      projects: 4,
      color: '#61DAFB'
    },
    {
      category: 'gamedev',
      name: 'Phaser',
      level: 90,
      icon: '🎮',
      experience: '2 years',
      projects: 8,
      color: '#000000'
    },
    {
      category: 'frontend',
      name: 'Three.js',
      level: 85,
      icon: '🌟',
      experience: '2 years',
      projects: 5,
      color: '#049EF4'
    },
    // Add more skills...
  ];

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <div className="skills-page">
      {/* Animated Background */}
      <div className="cyber-grid">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="grid-item" />
        ))}
      </div>

      {/* Header Section */}
      <motion.section
        className="skills-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="glitch-text" data-text="SKILL MATRIX">SKILL MATRIX</h1>
        <p className="header-description">
          Proficiency levels in various technologies and frameworks
        </p>
      </motion.section>

      {/* Category Filter */}
      <motion.div
        className="category-filter"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {skillCategories.map((category, index) => (
          <motion.button
            key={category.id}
            className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {category.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        className="skills-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="skill-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 20px ${skill.color}40`
            }}
          >
            <div className="skill-icon" style={{ backgroundColor: `${skill.color}20` }}>
              {skill.icon}
            </div>
            <h3>{skill.name}</h3>

            <div className="skill-level">
              <div className="level-bar">
                <motion.div
                  className="level-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  style={{ backgroundColor: skill.color }}
                />
              </div>
              <span className="level-number">{skill.level}%</span>
            </div>

            <div className="skill-details">
              <div className="detail-item">
                <span className="label">Experience:</span>
                <span className="value">{skill.experience}</span>
              </div>
              <div className="detail-item">
                <span className="label">Projects:</span>
                <span className="value">{skill.projects}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Experience Timeline */}
      <section className="experience-timeline">
        <h2 className="section-title">EXPERIENCE TIMELINE</h2>
        <div className="timeline">
          {/* Add your timeline items here */}
          <motion.div
            className="timeline-item"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="timeline-content">
              <h3>Jr. Game Developer</h3>
              <p className="company">Yudiz Solutions Limited</p>
              <p className="period">2023 - Present</p>
              <ul className="achievements">
                <li>Led development of 3 major game titles</li>
                <li>Implemented advanced graphics systems</li>
                <li>Junior developer</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className="certifications">
        <h2 className="section-title">ACHIEVEMENTS UNLOCKED</h2>
        <div className="certificates-grid">
          {/* Add your certificates here */}
          <motion.div
            className="certificate-card"
            whileHover={{ scale: 1.05 }}
          >
            <div className="certificate-icon">🏆</div>
            <h3>Phaser Certified Developer</h3>
            <p>Issued by Phaser</p>
            <span className="year">2023</span>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Skills;