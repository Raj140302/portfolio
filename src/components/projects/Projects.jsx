import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);

  const VERCEL_TOKEN = import.meta.env.VITE_VERCEL_TOKEN;
  const TEAM_ID = import.meta.env.VITE_TEAM_ID;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // Fetch all projects
      const projectsResponse = await axios.get('https://api.vercel.com/v9/projects', {
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
        },
        params: {
          teamId: TEAM_ID,
        },
      });

      // Process each project
      const transformedProjects = await Promise.all(
        projectsResponse.data.projects.map(async (project) => {
          // Fetch the latest deployment for this project
          console.log(project);

          const deploymentsResponse = await axios.get(
            `https://api.vercel.com/v6/deployments`,
            {
              headers: {
                Authorization: `Bearer ${VERCEL_TOKEN}`,
              },
              params: {
                projectId: project.id,
                limit: 1,
                state: 'READY',
                target: 'production',
              },
            }
          );

          const deployment = deploymentsResponse.data.deployments[0];

          // Determine category
          let category = 'web';
          if (project.framework?.includes('phaser') || project.name.toLowerCase().includes('game')) {
            category = 'games';
          } else if (project.framework?.includes('three') || project.name.toLowerCase().includes('3d')) {
            category = '3d';
          }

          // Get deployment URL and create screenshot URL
          const deploymentUrl = deployment?.url;
          const screenshotUrl = await getLogoFromAssets(project);
          console.log(screenshotUrl);

          return {
            id: project.id,
            title: project.name,
            category: category,
            image: screenshotUrl,
            tech: [project.framework || 'Web'],
            description: project.description || 'A project built with modern technologies.',
            liveUrl: deploymentUrl ? `https://${deploymentUrl}` : '#',
            githubUrl: project.link || '#',
            features: [
              'Modern Architecture',
              'Responsive Design',
              'Interactive Elements'
            ],
            year: new Date(project.createdAt).getFullYear(),
            role: 'Lead Developer',
            status: deployment?.state || 'unknown'
          };
        })
      );

      setProjects(transformedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const filters = [
    { id: 'all', label: 'ALL PROJECTS' },
    { id: 'games', label: 'GAMES' },
    { id: 'web', label: 'WEB APPS' },
    { id: '3d', label: '3D EXPERIENCES' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  // Function to fetch and get logo from assets
  async function getLogoFromAssets(project) {
    const owner = project.link.owner || "yudiz-raj";
    const repo = project.link.repo
    const branch = project.link.productionBranch || "main";

    // Construct raw GitHub URL
    const imageUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/src/assets/images/logo.png`;

    return fetch(imageUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Image not found');
        }
        return response.blob();
      })
      .then(blob => URL.createObjectURL(blob))
      .catch(error => {
        console.error('Error fetching image:', error);
        return null;
      });
  }

  return (
    <div className="projects-page">
      {/* Header Section */}
      <motion.section
        className="projects-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="glitch-text" data-text="PROJECT ARCHIVE">PROJECT ARCHIVE</h1>
        <p className="header-description">
          Explore my portfolio of games, web applications, and interactive experiences
        </p>
      </motion.section>

      {/* Filters */}
      <motion.div
        className="project-filters"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {filters.map((filter, index) => (
          <motion.button
            key={filter.id}
            className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {filter.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        className="projects-grid"
        layout
      >
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card"
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <span className="project-category">{project.category}</span>
                  <h3>{project.title}</h3>
                  <div className="tech-stack">
                    {project.tech.map((tech) => (
                      <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                  <button className="view-project-btn">VIEW DETAILS</button>
                </div>
              </div>
              <div className="project-info">
                <div className="project-meta">
                  <span className="year">{project.year}</span>
                  <span className="status" data-status={project.status}>
                    {project.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="project-modal"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-modal"
                onClick={() => setSelectedProject(null)}
              >
                ×
              </button>

              <div className="modal-content">
                <div className="modal-image">
                  <img src={selectedProject.image} alt={selectedProject.title} />
                </div>

                <div className="modal-info">
                  <h2>{selectedProject.title}</h2>
                  <p className="project-description">{selectedProject.description}</p>

                  <div className="project-details">
                    <div className="detail-item">
                      <span className="label">Role</span>
                      <span className="value">{selectedProject.role}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Year</span>
                      <span className="value">{selectedProject.year}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Status</span>
                      <span className="value">{selectedProject.status}</span>
                    </div>
                  </div>

                  <div className="project-features">
                    <h3>Key Features</h3>
                    <ul>
                      {selectedProject.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="project-links">
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyber-button primary"
                    >
                      Launch Project
                    </a>
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyber-button secondary"
                    >
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;