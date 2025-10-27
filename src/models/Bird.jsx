import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";

import birdScene from "../assets/3d/bird.glb";

// Preload the model for better performance
useGLTF.preload(birdScene);

// 3D Model from: https://sketchfab.com/3d-models/phoenix-bird-844ba0cf144a413ea92c779f18912042
export function Bird({ isDarkMode }) {
    const birdRef = useRef();
    const originalColors = useRef(new Map());

    // Load the 3D model and animations from the provided GLTF file
    const { scene, animations } = useGLTF(birdScene);

    // Get access to the animations for the bird
    const { actions } = useAnimations(animations, birdRef);

    // Play the "Take 001" animation when the component mounts
    // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.
    useEffect(() => {
        actions["Take 001"].play();
    }, []);

    // Store original colors on first render
    useEffect(() => {
        if (birdRef.current && originalColors.current.size === 0) {
            birdRef.current.traverse((child) => {
                if (child.isMesh && child.material) {
                    originalColors.current.set(child.uuid, child.material.color.clone());
                }
            });
        }
    }, []);

    // Update bird materials based on theme
    useEffect(() => {
        if (birdRef.current) {
            birdRef.current.traverse((child) => {
                if (child.isMesh && child.material) {
                    const original = originalColors.current.get(child.uuid);
                    if (original) {
                        if (isDarkMode) {
                            // Darken the bird in dark mode
                            const darkColor = original.clone();
                            darkColor.multiplyScalar(0.6);
                            child.material.color.copy(darkColor);
                        } else {
                            // Restore original color in light mode
                            child.material.color.copy(original);
                        }
                        child.material.needsUpdate = true;
                    }
                }
            });
        }
    }, [isDarkMode]);

    useFrame(({ clock, camera }) => {
        // Update the Y position to simulate bird-like motion using a sine wave
        birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 3;

        // Check if the bird reached a certain endpoint relative to the camera
        if (birdRef.current.position.x > camera.position.x + 10) {
            // Change direction to backward and rotate the bird 180 degrees on the y-axis
            birdRef.current.rotation.y = Math.PI;
        } else if (birdRef.current.position.x < camera.position.x - 10) {
            // Change direction to forward and reset the bird's rotation
            birdRef.current.rotation.y = 0;
        }

        // Update the X and Z positions based on the direction
        if (birdRef.current.rotation.y === 0) {
            // Moving forward
            birdRef.current.position.x += 0.01;
            birdRef.current.position.z -= 0.01;
        } else {
            // Moving backward
            birdRef.current.position.x -= 0.01;
            birdRef.current.position.z += 0.01;
        }
    });

    return (
        // to create and display 3D objects
        <mesh ref={birdRef} position={[-7, 1.5, 1]} scale={[0.003, 0.003, 0.003]}>
            // use the primitive element when you want to directly embed a complex 3D
            model or scene
            <primitive object={scene} />
        </mesh>
    );
}