import { NavLink, useLocation } from "react-router-dom";

import { logo } from "../assets/images";

const Navbar = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <header className='header'>
            <NavLink to='/'>
                <img src={logo} alt='logo' className='w-18 h-18 object-contain' />
            </NavLink>
            <nav className='flex text-lg gap-7 font-medium'>
                <NavLink to='/about' className={({ isActive }) => isActive ? "text-blue-600 dark:text-blue-400" : (isHomePage ? "text-white" : "text-black dark:text-white")}>
                    About
                </NavLink>
                <NavLink to='/projects' className={({ isActive }) => isActive ? "text-blue-600 dark:text-blue-400" : (isHomePage ? "text-white" : "text-black dark:text-white")}>
                    Projects
                </NavLink>
            </nav>
        </header>
    );
};

export default Navbar;