import React from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../Hooks/useAuth';

const Navbar = () => {
    const { user, setUser, logout } = useAuth();
    const handleLogout = () => {
        logout().then(() => {
            alert('sign out user Succesfully');
            setUser(null);
        })
            .catch(error => {
                alert(error);
            })

    }
    const Links = <>
        <NavLink to="/"> <li>Home</li></NavLink>
        <NavLink to="/allneedpost"> <li>All Voluntier Need Post</li></NavLink>
        <NavLink to="/"> <li>My Post</li></NavLink>
    </>
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {
                                Links
                            }
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            Links
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <>
                            <div className="avatar">
                                <div className="ring-primary ring-offset-base-100 w-6 h-6 rounded-full ring-2 ring-offset-2">
                                    <img className='w-2 h-2' src={user.photoURL} />
                                </div>
                            </div>

                            <button onClick={handleLogout} className='btn btn-primary'>Log Out</button>
                        </> : <>
                            <Link to='/signup'>Registration</Link>
                            <Link to='/login'>Log In</Link>
                        </>

                    }
                </div>
            </div>

        </div>
    );
};

export default Navbar;