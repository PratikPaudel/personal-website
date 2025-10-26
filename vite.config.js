import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React and related libraries into a separate chunk
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Split Three.js and related 3D libraries into a separate chunk
          'three-vendor': ['@react-three/fiber', '@react-three/drei', '@react-spring/three'],
          // Split other heavy dependencies
          'vendor': ['@emailjs/browser', 'posthog-js', '@vercel/speed-insights'],
        },
      },
      // Suppress eval warnings from third-party libraries we don't control
      onwarn(warning, warn) {
        // Suppress eval warning from three-stdlib/lottie.js (we don't use lottie directly)
        if (warning.code === 'EVAL' && warning.id?.includes('three-stdlib')) return;
        warn(warning);
      },
    },
    // Increase chunk size warning limit since we're dealing with 3D models
    chunkSizeWarningLimit: 1000,
  },
})