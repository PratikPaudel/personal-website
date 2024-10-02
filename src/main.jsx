import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { injectSpeedInsights } from "@vercel/speed-insights";
import posthog from 'posthog-js';

// Initialize PostHog
posthog.init(import.meta.env.VITE_APP_PUBLIC_POSTHOG_KEY, { api_host: import.meta.env.VITE_APP_PUBLIC_POSTHOG_HOST });

injectSpeedInsights();
ReactDOM.createRoot(document.getElementById('root')).render(<App />);