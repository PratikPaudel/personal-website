import { Link } from "react-router-dom";
import { CTA } from "../components";
import { projects } from "../constants";
import { arrow } from "../assets/icons";
import posthog from 'posthog-js';  // Import PostHog
import { useTheme } from "../context/ThemeContext";

const Projects = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    // Track page view when the Projects component is loaded
    posthog.capture('page_view', { page_name: 'Projects Page' });

    // Function to handle project link click tracking
    const trackProjectClick = (projectName) => {
        posthog.capture('project_link_click', {
            project_name: projectName
        });
    };

    return (
        <section className='max-container'>
            <h1 className='head-text dark:text-white'>
                My{" "}
                <span className='blue-gradient_text drop-shadow font-semibold'>
                    Projects
                </span>
            </h1>

            <p className='text-slate-500 dark:text-slate-400 mt-2 leading-relaxed'>
                I've embarked on numerous projects throughout the years, but these are
                the ones I hold closest to my heart. Many of them are open-source, so if
                you come across something that piques your interest, feel free to
                explore the codebase and contribute your ideas for further enhancements.
                Your collaboration is highly valued!
            </p>

            <div className='flex flex-wrap my-20 gap-16'>
                {projects.map((project) => (
                    <div className='lg:w-[400px] w-full' key={project.name}>
                        <div className='block-container w-12 h-12'>
                            <div className={`btn-back rounded-xl ${project.theme}`} />
                            <div className='btn-front rounded-xl flex justify-center items-center'>
                                <img
                                    src={project.iconUrl}
                                    alt={project.name}
                                    className='w-1/2 h-1/2 object-contain'
                                />
                            </div>
                        </div>

                        <div className='mt-5 flex flex-col'>
                            <h4 className='text-2xl font-poppins font-semibold dark:text-white'>
                                {project.name}
                            </h4>
                            <p className='mt-2 text-slate-500 dark:text-slate-400'>{project.description}</p>
                            <div className='mt-5 flex items-center gap-2 font-poppins'>
                                <Link
                                    to={project.link}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='font-semibold text-blue-600 dark:text-blue-400'
                                    onClick={() => trackProjectClick(project.name)}  // Track link click
                                >
                                    Live Link
                                </Link>
                                <img
                                    src={arrow}
                                    alt='arrow'
                                    className='w-4 h-4 object-contain'
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <hr className='border-slate-200 dark:border-slate-700' />

            <CTA />

            {/* Theme Toggle Button */}
            <div className='fixed bottom-8 left-8 z-50'>
                <button
                    onClick={toggleTheme}
                    className='w-12 h-12 cursor-pointer bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-all shadow-lg'
                    aria-label='Toggle theme'
                >
                    <span className='text-2xl'>
                        {isDarkMode ? '☀️' : '🌙'}
                    </span>
                </button>
            </div>
        </section>
    );
};

export default Projects;
