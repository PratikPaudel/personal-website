import { useEffect, useRef, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

import planeScene from "../assets/3d/plane.glb";

// Preload the model for better performance
useGLTF.preload(planeScene);

// 3D Model from: https://sketchfab.com/3d-models/stylized-ww1-plane-c4edeb0e410f46e8a4db320879f0a1db
export function Plane({ isRotating, isDarkMode, ...props }) {
    const ref = useRef();
    const originalColors = useRef(new Map());

    // Load the 3D model and its animations
    const { scene, animations } = useGLTF(planeScene);
    const clonedScene = useMemo(() => scene.clone(true), [scene]);
    // Get animation actions associated with the plane
    const { actions } = useAnimations(animations, ref);

    // Use an effect to control the plane's animation based on 'isRotating'
    // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.
    useEffect(() => {
        if (isRotating) {
            actions["Take 001"].play();
        } else {
            actions["Take 001"].stop();
        }
    }, [actions, isRotating]);

    // Store original colors and clone materials on first render
    useEffect(() => {
        if (ref.current && originalColors.current.size === 0) {
            ref.current.traverse((child) => {
                if (child.isMesh && child.material) {
                    // Clone material to avoid shared state
                    child.material = child.material.clone();
                    originalColors.current.set(child.uuid, child.material.color.clone());
                }
            });
        }
    }, []);

    // Update plane materials based on theme
    useEffect(() => {
        if (ref.current) {
            ref.current.traverse((child) => {
                if (child.isMesh && child.material) {
                    const original = originalColors.current.get(child.uuid);
                    if (original) {
                        if (isDarkMode) {
                            // Darken the plane in dark mode
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

    return (
        <mesh {...props} ref={ref}>
            // use the primitive element when you want to directly embed a complex 3D
            model or scene
            <primitive object={clonedScene} />
        </mesh>
    );
}