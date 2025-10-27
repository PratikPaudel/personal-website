import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";

import { soundoff, soundon } from "../assets/icons";
import sakuraPart0 from "../assets/sakura-part0.mp3";
import sakuraPart1 from "../assets/sakura-part1.mp3";
import sakuraPart2 from "../assets/sakura-part2.mp3";
import sakuraPart3 from "../assets/sakura-part3.mp3";
import sakuraPart4 from "../assets/sakura-part4.mp3";
import { HomeInfo, Loader } from "../components";
import { useTheme } from "../context/ThemeContext";
import { Bird, Island, Plane, Sky } from "../models";

// Stars component for animated background
const AnimatedStars = () => {
    const [stars, setStars] = useState([]);
    const colors = ['#f5d76e', '#f7ca18', '#f4d03f', '#ececec', '#ecf0f1', '#a2ded0'];

    useEffect(() => {
        // Generate initial stars
        const newStars = [];
        for (let i = 0; i < 150; i++) {
            newStars.push({
                id: i,
                size: Math.random() * 3,
                top: Math.random() * 100,
                left: Math.random() * 100,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }
        setStars(newStars);

        // Animate stars position
        const animateStars = () => {
            setStars(prevStars =>
                prevStars.map(star => ({
                    ...star,
                    top: Math.random() * 100,
                    left: Math.random() * 100,
                }))
            );
        };

        // Initial animation after 10ms
        const initialTimeout = setTimeout(animateStars, 10);

        // Repeat animation every 100 seconds
        const interval = setInterval(animateStars, 100000);

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30" style={{ zIndex: 1 }}>
            {stars.map(star => (
                <span
                    key={star.id}
                    className="absolute rounded-full"
                    style={{
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        top: `${star.top}%`,
                        left: `${star.left}%`,
                        background: star.color,
                        boxShadow: `0 0 ${Math.random() * 10}px ${star.color}`,
                        transition: 'all 100s linear',
                    }}
                />
            ))}
        </div>
    );
};

const Home = () => {
    const audioTracks = useRef([
        new Audio(sakuraPart0),
        new Audio(sakuraPart1),
        new Audio(sakuraPart2),
        new Audio(sakuraPart3),
        new Audio(sakuraPart4),
    ]);

    // Set volume for all tracks
    audioTracks.current.forEach(audio => {
        audio.volume = 0.4;
    });

    const { isDarkMode, toggleTheme } = useTheme();
    const [currentStage, setCurrentStage] = useState(1);
    const [isRotating, setIsRotating] = useState(false);
    const [isPlayingMusic, setIsPlayingMusic] = useState(false);
    const [showHints, setShowHints] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);

    useEffect(() => {
        // Check if user has seen the hints before
        const hasSeenHints = localStorage.getItem('hasSeenHints');
        if (!hasSeenHints) {
            setShowHints(true);
            // Auto-hide hints after 8 seconds
            const timer = setTimeout(() => {
                setShowHints(false);
                localStorage.setItem('hasSeenHints', 'true');
            }, 8000);
            return () => clearTimeout(timer);
        }
    }, []);

    const dismissHints = () => {
        setShowHints(false);
        localStorage.setItem('hasSeenHints', 'true');
    };

    // Reset track to beginning when music is turned off
    useEffect(() => {
        if (!isPlayingMusic) {
            setCurrentTrack(0);
            audioTracks.current.forEach(audio => {
                audio.currentTime = 0;
            });
        }
    }, [isPlayingMusic]);

    // Handle audio playback with chunked tracks
    useEffect(() => {
        const currentAudio = audioTracks.current[currentTrack];

        if (isPlayingMusic) {
            currentAudio.play();

            // When current track ends, move to next track
            const handleTrackEnd = () => {
                setCurrentTrack((prev) => (prev + 1) % audioTracks.current.length); // Loop back to start
            };

            currentAudio.addEventListener('ended', handleTrackEnd);

            return () => {
                currentAudio.removeEventListener('ended', handleTrackEnd);
                currentAudio.pause();
            };
        } else {
            // Pause all tracks when music is stopped
            audioTracks.current.forEach(audio => audio.pause());
        }
    }, [isPlayingMusic, currentTrack]);

    const adjustBiplaneForScreenSize = () => {
        let screenScale, screenPosition;

        // If screen width is less than 768px, adjust the scale and position
        if (window.innerWidth < 768) {
            screenScale = [1.5, 1.5, 1.5];
            screenPosition = [0, -1.5, 2];
        } else {
            screenScale = [3, 3, 3];
            screenPosition = [-2, -2, 1];
        }

        return [screenScale, screenPosition];
    };

    const adjustIslandForScreenSize = () => {
        let screenScale, screenPosition;

        if (window.innerWidth < 768) {
            screenScale = [6, 6, 6];
            screenPosition = [0, 0, -5];
        } else {
            screenScale = [8.5, 8.5, 8.5];
            screenPosition = [0, 0, -8];
        }

        return [screenScale, screenPosition];
    };

    const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
    const [islandScale, islandPosition] = adjustIslandForScreenSize();

    return (
        <section className='w-full h-screen relative'>
            {/* Animated stars background for dark mode */}
            {isDarkMode && <AnimatedStars />}

            {/* Nepal Flag on top of temple */}
            <div className='absolute top-[28%] left-[calc(50%+4px)] transform -translate-x-1/2 -translate-y-1/2 z-[5] pointer-events-none'>
                <span className='text-7xl' style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
                    🇳🇵
                </span>
            </div>

            <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
                {currentStage && <HomeInfo currentStage={currentStage} />}
            </div>

            {/* Hint tooltips for first-time visitors */}
            {showHints && (
                <>
                    {/* Click/drag hint - ripple circle in the center */}
                    <div className='click-hint-circle z-20 pointer-events-none'></div>
                </>
            )}

            <Canvas
                className={`w-full h-screen bg-transparent ${isRotating ? "cursor-grabbing" : "cursor-grab"
                    }`}
                camera={{ near: 0.1, far: 1000 }}
            >
                <Suspense fallback={<Loader />}>
                    {/* Fog for atmospheric depth - only in dark mode */}
                    {isDarkMode && <fog attach="fog" args={['#1e293b', 50, 300]} />}
                    {/* Light Mode - Bright daytime with warm golden sunlight */}
                    {!isDarkMode && (
                        <>
                            <directionalLight position={[5, 5, 5]} intensity={2.5} color="#FFF4E6" />
                            <ambientLight intensity={0.8} color="#FFFAF0" />
                            <pointLight position={[10, 8, 10]} intensity={1.5} color="#FFE4B5" />
                            <spotLight
                                position={[0, 50, 10]}
                                angle={0.2}
                                penumbra={1}
                                intensity={2}
                                color="#FAFAD2"
                            />
                            <hemisphereLight
                                skyColor='#ffffff'
                                groundColor='#F5DEB3'
                                intensity={0.6}
                            />
                        </>
                    )}

                    {/* Dark Mode - Same lighting as light mode to keep temple unchanged */}
                    {isDarkMode && (
                        <>
                            <directionalLight position={[1, 1, 1]} intensity={2} />
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 5, 10]} intensity={2} />
                            <spotLight
                                position={[0, 50, 10]}
                                angle={0.15}
                                penumbra={1}
                                intensity={2}
                            />
                            <hemisphereLight
                                skyColor='#b1e1ff'
                                groundColor='#000000'
                                intensity={1}
                            />
                        </>
                    )}

                    <Bird isDarkMode={isDarkMode} />
                    <Sky isRotating={isRotating} isDarkMode={isDarkMode} />
                    <Island
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                        isDarkMode={isDarkMode}
                        position={islandPosition}
                        rotation={[0.1, 4.7077, 0]}
                        scale={islandScale}
                    />
                    <Plane
                        isRotating={isRotating}
                        isDarkMode={isDarkMode}
                        position={biplanePosition}
                        rotation={[0, 20.1, 0]}
                        scale={biplaneScale}
                    />
                </Suspense>
            </Canvas>

            <div className='absolute bottom-2 left-2 flex gap-3'>
                <div className='relative'>
                    {showHints && (
                        <div className='music-hint-circle'></div>
                    )}
                    <img
                        src={!isPlayingMusic ? soundoff : soundon}
                        alt='jukebox'
                        onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                        className='w-10 h-10 cursor-pointer object-contain relative z-10'
                    />
                </div>

                <div className='relative'>
                    <button
                        onClick={toggleTheme}
                        className='w-10 h-10 cursor-pointer bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-all'
                        aria-label='Toggle theme'
                    >
                        <span className='text-2xl'>
                            {isDarkMode ? '☀️' : '🌙'}
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Home;