import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Footer, Navbar } from "./components";
import posthog from 'posthog-js';

// Lazy load route components for code splitting
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Projects = lazy(() => import("./pages/Projects"));

// Route loading fallback
const RouteLoader = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="w-20 h-20 border-2 border-opacity-20 border-blue-500 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
);

const App = () => {
    return (
        <main className='bg-slate-300/20'>
            <Router>
                <Navbar />
                <Suspense fallback={<RouteLoader />}>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route
                            path='/*'
                            element={
                                <>
                                    <Routes>
                                        <Route path='/about' element={<About />} />
                                        <Route path='/projects' element={<Projects />} />
                                        <Route path='/contact' element={<Contact />} />
                                    </Routes>
                                    <Footer />
                                </>
                            }
                        />
                    </Routes>
                </Suspense>
            </Router>
        </main>
    );
};

export default App;