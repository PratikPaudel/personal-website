import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";

import { soundoff, soundon } from "../assets/icons";
import sakuraPart0 from "../assets/sakura-part0.mp3";
import sakuraPart1 from "../assets/sakura-part1.mp3";
import sakuraPart2 from "../assets/sakura-part2.mp3";
import sakuraPart3 from "../assets/sakura-part3.mp3";
import sakuraPart4 from "../assets/sakura-part4.mp3";
import { HomeInfo, Loader } from "../components";
import { Bird, Island, Plane, Sky } from "../models";

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

    const [currentStage, setCurrentStage] = useState(1);
    const [isRotating, setIsRotating] = useState(false);
    const [isPlayingMusic, setIsPlayingMusic] = useState(false);
    const [showHints, setShowHints] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('isDarkMode');
        return saved === 'true';
    });

    useEffect(() => {
        // Save dark mode preference
        localStorage.setItem('isDarkMode', isDarkMode);
    }, [isDarkMode]);

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
                    {isDarkMode && <fog attach="fog" args={['#0a0a1a', 50, 300]} />}
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
                        onClick={() => setIsDarkMode(!isDarkMode)}
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