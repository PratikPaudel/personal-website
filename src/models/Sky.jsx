import { useRef, useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import skyScene from "../assets/3d/sky.glb";

// Preload the model for better performance
useGLTF.preload(skyScene);

// 3D Model from: https://sketchfab.com/3d-models/phoenix-bird-844ba0cf144a413ea92c779f18912042
export function Sky({ isRotating, isDarkMode }) {
    const sky = useGLTF(skyScene);
    const skyRef = useRef();
    const originalMaterials = useRef(new Map());

    // Store original material colors on first render
    useEffect(() => {
        if (skyRef.current && originalMaterials.current.size === 0) {
            skyRef.current.traverse((child) => {
                if (child.isMesh && child.material) {
                    console.log('Sky mesh found:', child.name, 'Color:', child.material.color);
                    originalMaterials.current.set(child.uuid, {
                        color: child.material.color.clone(),
                        emissive: child.material.emissive?.clone(),
                        emissiveIntensity: child.material.emissiveIntensity || 0
                    });
                }
            });
            console.log('Stored original materials for', originalMaterials.current.size, 'meshes');
        }
    }, []);

    // Create stars for night mode
    const stars = useMemo(() => {
        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.7,
            transparent: true,
            opacity: 0.8,
        });

        const starVertices = [];
        for (let i = 0; i < 1000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = Math.random() * 500 + 200;
            const z = (Math.random() - 0.5) * 2000;
            starVertices.push(x, y, z);
        }

        starGeometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(starVertices, 3)
        );

        return new THREE.Points(starGeometry, starMaterial);
    }, []);

    // Update sky materials based on theme
    useEffect(() => {
        if (skyRef.current) {
            skyRef.current.traverse((child) => {
                if (child.isMesh && child.material) {
                    if (isDarkMode) {
                        // Dark mode - deep twilight blues and purples
                        child.material.color.setHex(0x1a1a3e);
                        child.material.emissive?.setHex(0x0f0f2e);
                        child.material.emissiveIntensity = 0.3;
                    } else {
                        // Light mode - restore original white
                        const original = originalMaterials.current.get(child.uuid);
                        if (original) {
                            child.material.color.copy(original.color);
                            if (child.material.emissive && original.emissive) {
                                child.material.emissive.copy(original.emissive);
                            }
                            child.material.emissiveIntensity = original.emissiveIntensity;
                        }
                    }
                    child.material.needsUpdate = true;
                }
            });
        }
    }, [isDarkMode]);

    // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.
    // It ensures smooth animations by making the rotation frame rate-independent.
    // 'delta' represents the time in seconds since the last frame.
    useFrame((_, delta) => {
        if (isRotating) {
            skyRef.current.rotation.y += 0.25 * delta; // Adjust the rotation speed as needed
        }
    });

    return (
        <group ref={skyRef}>
            <primitive object={sky.scene} />

            {/* Stars visible only in dark mode */}
            {isDarkMode && <primitive object={stars} />}

            {/* Moon visible only in dark mode */}
            {isDarkMode && (
                <mesh position={[100, 150, -200]}>
                    <sphereGeometry args={[15, 32, 32]} />
                    <meshStandardMaterial
                        color="#fffef0"
                        emissive="#fffef0"
                        emissiveIntensity={0.8}
                    />
                </mesh>
            )}
        </group>
    );
}