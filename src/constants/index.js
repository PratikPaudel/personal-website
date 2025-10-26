import { esports, scholarshipauditions, vermeer, nwc, moodlog, boxsy, stackai } from "../assets/images";
import {
    contact,
    css,
    github,
    javascript,
    linkedin,
    youtube,
    nextjs,
    react,
    tailwindcss,
    aiflashcards,
    pantrytracker,
    typescript,
    aftereffects,
    angular,
    blender,
    docker,
    dotnet,
    figma,
    illustrator,
    premierepro,
    photoshop,
    python,
    java,
    postgres,
    redis,
    gcp,
    azure
} from "../assets/icons";

export const skills = [
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: nextjs,
        name: "Next.js",
        type: "Frontend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: docker,
        name: "Docker",
        type: "Containerization",
    },
    {
        imageUrl: dotnet,
        name: ".NET",
        type: "Backend",
    },
    {
        imageUrl: angular,
        name: "Angular",
        type: "Frontend",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: typescript,
        name: "TypeScript",
        type: "Frontend",
    },
    {
        imageUrl: photoshop,
        name: "Photoshop",
        type: "Design",
    },
    {
        imageUrl: aftereffects,
        name: "After Effects",
        type: "Animation",
    },
    {
        imageUrl: blender,
        name: "Blender",
        type: "3D Modeling",
    },
    {
        imageUrl: figma,
        name: "Figma",
        type: "Design",
    },
    {
        imageUrl: illustrator,
        name: "Illustrator",
        type: "Design",
    },
    {
        imageUrl: premierepro,
        name: "Premiere Pro",
        type: "Video Editing",
    },
    {
        imageUrl: python,
        name: "Python",
        type: "Backend",
    },
    {
        imageUrl: java,
        name: "Java",
        type: "Backend",
    },
    {
        imageUrl: postgres,
        name: "PostgreSQL",
        type: "Database",
    },
    {
        imageUrl: redis,
        name: "Redis",
        type: "Database",
    },
    {
        imageUrl: gcp,
        name: "Google Cloud Platform",
        type: "Cloud",
    },
    {
        imageUrl: azure,
        name: "Azure",
        type: "Cloud",
    }
];

export const experiences = [
    {
        title: "AI Engineer",
        company_name: "StackAI",
        icon: stackai,
        iconBg: "#FFFFFF",
        date: "Oct 2024 - Present",
        points: [
            "San Francisco, CA",
        ],
    },
    {
        title: "Full Stack Developer",
        company_name: "Boxsy Inc.",
        icon: boxsy,
        iconBg: "#6366F1",
        date: "Jul 2024 - Oct 2024",
        points: [
            "Actively monitored the landscape of AI-powered development tools, evaluating and implementing cutting-edge solutions to enhance engineering productivity and developer workflows at Boxsy's SaaS platform",
            "Developed scalable frontend interfaces and backend APIs while integrating AI-driven features into the platform, implementing AI models for personalized user interactions and building data pipelines to support AI-powered functionalities",
            "Established development workflows using agile methodologies, implemented testing frameworks and performance optimization strategies, while participating in cross-functional collaboration through sprint planning",
        ],
    },
    {
        title: "IT - Software Engineering Intern",
        company_name: "Vermeer Corporation",
        icon: vermeer,
        iconBg: "#accbe1",
        date: "May 2024 - Dec 2024",
        points: [
            "Developed enterprise form builder using .NET with OAuth 2.0 authentication, digitizing vehicle inspection workflows and reducing manual processes by 92% through automated solutions",
            "Delivered new features weekly using Agile methodologies and Test-Driven Development, incorporating feedback from 50+ users and dealers, resulting in 40% improvement in feature usability",
            "Spearheaded containerization of 5+ APIs with Docker and implemented automated CI/CD workflows with integration testing, reducing deployment times by 40% and improving test coverage by 30%",
        ],
    },
    {
        title: "Full Stack Web Developer",
        company_name: "Northwestern College",
        icon: nwc,
        iconBg: "#fbc3bc",
        date: "Aug 2022 - May 2024",
        points: [
            "Revamped a comprehensive college website using .NET, C#, HTML, CSS, and JavaScript, resulting in a visually appealing and highly functional platform, ensuring seamless user experience on cross-platform",
            "Created 100+ modular components, web pages, led to 30% increase in page views and 20% longer average time spent on site (Google Analytics)",
            "Empowered non-technical marketing teams with CMS, website builder, resulting in a 40% reduction in reliance on developers for routine changes",
        ],
    },
    {
        title: "Web Developer",
        company_name: "Scholarship Auditions",
        icon: scholarshipauditions,
        iconBg: "#ff6950",
        date: "Jan 2022 - Jan 2023",
        points: [
            "Creating the front-end with React, including the homepage, quiz app, games, and newsletter signup.",
            "Using RESTful APIs to fetch data for quizzes and podcasts, and implementing Redux to manage user information and scores.",
            "Building and deploying a PostgreSQL database with tables for podcasts, music, and scores using AWS RDS.",
        ],
    },
    {
        title: "Student Media Manager - Esports",
        company_name: "Northwestern",
        icon: esports,
        iconBg: "#A80000",
        date: "Aug 2021 - Aug 2024",
        points: [
            "Led a media team, conducting 50+ player interviews, curating content, travel vlogs, and overseeing content management decisions for the Esports team",
            "Produced engaging Twitch and YouTube content, creating intros, outros, and animations for the Esports team",
            "Designed stream graphics, landing pages, and visual showcases to enhance the team's online presence",
        ],
    },
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/PratikPaudel',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/heypratikpaudel',
    },
    {
        name: 'YouTube',
        iconUrl: youtube,
        link: 'https://www.youtube.com/@PratikkkPaudel',
    }
];

export const projects = [
    {
        iconUrl: aiflashcards,
        theme: 'btn-back-green',
        name: 'human™ - a Large Lived Experience Model',
        description: 'A modern web application that allows users to search through an archive of human experiences using voice or text input, powered by AI-driven search and summarization capabilities.',
        link: 'https://github.com/PratikPaudel/llem',
    },
    {
        iconUrl: aiflashcards,
        theme: 'btn-back-green',
        name: 'GitNest 🌳',
        description: 'Visualize GitHub repository structures with an elegant, interactive tree view.',
        link: 'https://github.com/PratikPaudel/GitNest',
    },
    {
        iconUrl: aiflashcards,
        theme: 'btn-back-green',
        name: 'Ecocycle',
        description: 'A real-time data manipulation web application allowing administrators to add, track and analyze training metrics instantly, improving decision-making efficiency for over 5 department.',
        link: 'https://github.com/Kitamreik/ecocycle-test',
    },    
    {
        iconUrl: pantrytracker,
        theme: 'btn-back-yellow',
        name: 'Pantry Tracker & Recipe Recommender',
        description: 'Helps you effortlessly manage your pantry inventory and discover new recipes based on what you have on hand. With advanced AI, it recognizes products and suggests delicious recipes tailored to your ingredients.',
        link: 'https://github.com/PratikPaudel/pantry-tracker',
    },
    {
        iconUrl: moodlog,
        theme: 'btn-back-blue',
        name: 'MoodLog',
        description: 'MoodLog helps you log and visualize your mood patterns, improving self-awareness and mental health management. Integrated with Firebase for secure user login, real-time data storage, and personalized mood tracking.',
        link: 'https://github.com/PratikPaudel/moodlog',
    }, 
    {
        iconUrl: aiflashcards,
        theme: 'btn-back-green',
        name: 'AI Flashcards',
        description: 'Just paste your text, and the AI takes care of generating smart flashcards for you. Plus, it can even pull information from PDFs and images to create flashcards. It’s designed to make learning easier and more flexible.',
        link: 'https://github.com/PratikPaudel/flashcard-saas',
    }, 
];
