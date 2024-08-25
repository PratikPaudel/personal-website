import { esports, scholarshipauditions, vermeer, nwc, moodlog } from "../assets/images";
import {
    contact,
    css,
    express,
    git,
    github,
    javascript,
    linkedin,
    youtube,
    mongodb,
    nextjs,
    nodejs,
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
    photoshop
} from "../assets/icons";

export const skills = [
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: express,
        name: "Express",
        type: "Backend",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: mongodb,
        name: "MongoDB",
        type: "Database",
    },
    {
        imageUrl: nextjs,
        name: "Next.js",
        type: "Frontend",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
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
    }
];

export const experiences = [
    {
        title: "Software Engineer",
        company_name: "Vermeer Coorporation",
        icon: vermeer,
        iconBg: "#accbe1",
        date: "May 2024 - Present",
        points: [
            "Developing and maintaining microservices within a distributed architecture using .NET, C#, and JavaScript/jQuery, ensuring scalability and flexibility.",
            "Managing infrastructure in cloud environments with Linux/Unix-based systems and container technologies like Docker and Kubernetes, integrating testing practices and conducting unit testing.",
            "Participating in Scrum ceremonies and agile processes, collaborating with cross-functional teams to deliver high-quality software increments.",
            "Implementing CI/CD pipelines with GitHub Actions, Docker, and Terraform to automate build, test, and deployment processes.",
        ],
    },
    {
        title: "Full Stack Web Developer",
        company_name: "Northwestern",
        icon: nwc,
        iconBg: "#fbc3bc",
        date: "Jan 2021 - Feb 2022",
        points: [
            "Revamping and modernizing a comprehensive college website using .NET, C#, HTML, CSS, and JavaScript, resulting in a visually appealing and highly functional platform, ensuring seamless cross-platform user experience.",
            "Creating 150+ modular components and landing pages, leading to a 30% increase in page views and a 20% longer average time spent on site (Google Analytics).",
            "Collaborating with cross-functional teams to align website designs, including concepts, wireframes, and prototypes, with brand guidelines and objectives.",
            "Empowering non-technical marketing teams with a CMS and website builder, resulting in a 40% reduction in reliance on developers for routine changes.",
            "Engineering database-driven features for dynamic content rendering, simplifying CMS usage, optimizing code efficiency, and improving overall functionality.",
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
        date: "Jan 2023 - Present",
        points: [
            "Leading a media team, conducting 50+ player interviews, curating content, travel vlogs, and overseeing content management decisions for the Esports team.",
            "Producing engaging Twitch and YouTube content, including intros, outros, and animations for the Esports team.",
            "Designing stream graphics, landing pages, and visual showcases to enhance the team's online presence.",
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
    ,
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
        name: 'AI Flashcards',
        description: 'Just paste your text, and the AI takes care of generating smart flashcards for you. Plus, it can even pull information from PDFs and images to create flashcards. It’s designed to make learning easier and more flexible.',
        link: 'https://github.com/PratikPaudel/flashcard-saas',
    },
    {
        iconUrl: pantrytracker,
        theme: 'btn-back-yellow',
        name: 'Pantry Tracker & Recipe Recommender',
        description: 'helps you effortlessly manage your pantry inventory and discover new recipes based on what you have on hand. With advanced AI, it recognizes products and suggests delicious recipes tailored to your ingredients.',
        link: 'https://github.com/PratikPaudel/pantry-tracker',
        github: '',
    },
    {
        iconUrl: moodlog,
        theme: 'btn-back-blue',
        name: 'MoodLog',
        description: 'MoodLog helps you log and visualize your mood patterns, improving self-awareness and mental health management. Integrated with Firebase for secure user login, real-time data storage, and personalized mood tracking.',
        link: 'https://github.com/PratikPaudel/moodlog',
        github: '',
    }
];