import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <header className='header'>
            <NavLink to='/'>
            </NavLink>
            <nav className='flex text-lg gap-7 font-medium'>
                <NavLink to='/about' className={({ isActive }) => isActive ? "text-blue-600" : "text-black" }>
                    About
                </NavLink>
                <NavLink to='/projects' className={({ isActive }) => isActive ? "text-blue-600" : "text-black"}>
                    Projects
                </NavLink>
            </nav>
        </header>
    );
};

export default Navbar;