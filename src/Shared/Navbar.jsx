import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import { useTheme } from '../AuthProvider/ThemeProvider';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    console.log(theme, toggleTheme);
    const { user, setUser, logout } = useAuth();
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const handleLogout = () => {
        logout()
            .then(() => {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger',
                    },
                    buttonsStyling: false,
                });

                swalWithBootstrapButtons
                    .fire({
                        title: 'Are you sure?',
                        text: 'You want to log out or Not!',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes, Log Out!',
                        cancelButtonText: 'No, cancel!',
                        reverseButtons: true,
                    })
                    .then((result) => {
                        if (result.isConfirmed) {
                            swalWithBootstrapButtons.fire({
                                title: 'Log Out!',
                                text: 'You Logged Out Successfully.',
                                icon: 'success',
                            });
                            setUser(null);
                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                            swalWithBootstrapButtons.fire({
                                title: 'Cancelled',
                                text: 'You are still logged in now',
                                icon: 'error',
                            });
                            setUser(user);
                        }
                    });
            })
            .catch((error) => {
                alert(error);
            });
    };

    // Links outside profile dropdown
    const mainLinks = (
        <>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? 'bg-green-600 text-white px-3 py-2 rounded' : 'px-3 py-2'
                }
            >
                <li>Home</li>
            </NavLink>

            <NavLink
                to="/allneedpost"
                className={({ isActive }) =>
                    isActive ? 'bg-green-600 text-white px-3 py-2 rounded' : 'px-3 py-2'
                }
            >
                <li>All Volunteer Need Post</li>
            </NavLink>
        </>
    );

    return (
        <div>
            <div className={`navbar bg-base-100 shadow-sm ${theme === 'light' ? 'bg-gray-500 text-white' : ''}`}>
                <div className="navbar-start">
                    <Tooltip id="my-tooltip" />

                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                            onClick={() => setShowProfileDropdown(false)} // close dropdown on mobile toggle
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow gap-4"
                        >
                            {mainLinks}
                            {user && (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                        className={`px-3 py-2 rounded transition-all duration-300 ${showProfileDropdown ? 'bg-green-700 text-white' : 'hover:bg-green-600 hover:text-white'
                                            }`}
                                    >
                                        My Profile ▾
                                    </button>

                                    {showProfileDropdown && (
                                        <ul className="absolute top-full left-0 bg-white text-black shadow-xl rounded-xl mt-2 z-50 w-64 border border-green-200">
                                            <li>
                                                <NavLink
                                                    to="/addvoluntieer"
                                                    onClick={() => setShowProfileDropdown(false)}
                                                    className="block px-4 py-2 hover:bg-green-600 hover:text-white rounded-tl rounded-tr"
                                                >
                                                    ➕ Add Need Volunteer
                                                </NavLink>
                                            </li>

                                            {/* Nested submenu for Manage My Post */}
                                            <li className="group relative">
                                                <div className="flex justify-between items-center px-4 py-2 hover:bg-green-600 hover:text-white cursor-pointer rounded-tl rounded-tr">
                                                    📋 Manage My Post ▸
                                                </div>
                                                <ul
                                                    className="absolute top-0 left-full bg-white border border-green-200 rounded-xl shadow-lg hidden group-hover:block z-50 w-64"
                                                    style={{ marginLeft: '-4px' }}
                                                >
                                                    <li>
                                                        <NavLink
                                                            to="/my-need-posts"
                                                            onClick={() => setShowProfileDropdown(false)}
                                                            className="block px-4 py-2 hover:bg-green-600 hover:text-white rounded-tl rounded-tr"
                                                        >
                                                            🧾 My Volunteer Need Post
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/my-request-posts"
                                                            onClick={() => setShowProfileDropdown(false)}
                                                            className="block px-4 py-2 hover:bg-green-600 hover:text-white rounded-bl rounded-br"
                                                        >
                                                            📥 My Volunteer Request Post
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            )}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl font-bold">Volunteer Management</a>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-4">{mainLinks}</ul>
                </div>

                <div className="navbar-center hidden lg:flex">
                    {user && (
                        <div className="relative">
                            <button
                                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                className={`px-3 py-2 rounded transition-all duration-300 ${showProfileDropdown ? 'bg-green-700 text-white' : 'hover:bg-green-600 hover:text-white'
                                    }`}
                            >
                                My Profile ▾
                            </button>

                            {showProfileDropdown && (
                                <ul className="absolute top-full left-0 bg-white text-black shadow-xl rounded-xl mt-2 z-50 w-64 border border-green-200">
                                    <li>
                                        <NavLink
                                            to="/addvoluntieer"
                                            onClick={() => setShowProfileDropdown(false)}
                                            className="block px-4 py-2 hover:bg-green-600 hover:text-white rounded-tl rounded-tr"
                                        >
                                            ➕ Add Need Volunteer
                                        </NavLink>
                                    </li>

                                    {/* Nested submenu for Manage My Post */}
                                    <li className="group relative">
                                        <div className="flex justify-between items-center px-4 py-2 hover:bg-green-600 hover:text-white cursor-pointer rounded-tl rounded-tr">
                                            📋 Manage My Post ▸
                                        </div>
                                        <ul
                                            className="absolute top-0 left-full bg-white border border-green-200 rounded-xl shadow-lg hidden group-hover:block z-50 w-64"
                                            style={{ marginLeft: '-4px' }}
                                        >
                                            <li>
                                                <NavLink
                                                    to="/my-need-posts"
                                                    onClick={() => setShowProfileDropdown(false)}
                                                    className="block px-4 py-2 hover:bg-green-600 hover:text-white rounded-tl rounded-tr"
                                                >
                                                    🧾 My Volunteer Need Post
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/my-request-posts"
                                                    onClick={() => setShowProfileDropdown(false)}
                                                    className="block px-4 py-2 hover:bg-green-600 hover:text-white rounded-bl rounded-br"
                                                >
                                                    📥 My Volunteer Request Post
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            )}
                        </div>
                    )}
                </div>

                <div className="navbar-end flex items-center gap-4">
                    <button className='mr-4'
                        onClick={toggleTheme}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1.5rem',
                            color: theme === 'light' ? '#000' : '#fff',
                        }}
                    >
                        {theme === 'light' ? <FaMoon color='white' /> : < FaSun color='black' />}
                    </button>

                    {user ? (
                        <>

                            <a
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content={user?.displayName}
                                data-tooltip-place="top"
                            >
                                <div className="avatar">
                                    <div className="ring-primary ring-offset-base-100 w-8 h-8 rounded-full ring-2 ring-offset-2">
                                        <img className="w-full h-full object-cover rounded-full" src={user.photoURL} alt="User Avatar" />
                                    </div>
                                </div>


                            </a>






                            <button onClick={handleLogout} className="btn bg-green-600 text-white">
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/signup" className="mr-4">
                                <button className="btn bg-green-600 text-white">Registration</button>
                            </Link>
                            <Link to="/login">
                                <button className="btn bg-green-600 text-white">Log In</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
