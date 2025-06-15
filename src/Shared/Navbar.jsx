import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user, setUser, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        logout().then(() => {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
                title: "Are you sure?",
                text: "You want to log out or Not!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Log Out!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire({
                        title: "Log Out!",
                        text: "You Logged Out Succesfully.",
                        icon: "success"
                    });
                    setUser(null);
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelled",
                        text: "You are still Login In now",
                        icon: "error"
                    });
                    setUser(user);
                }
            });


        })
            .catch(error => {
                alert(error);
            })

    }
    const Links = (
        <>
            <NavLink
                to="/"
                onClick={() => setShowDropdown(false)}
                className={({ isActive }) =>
                    isActive
                        ? 'bg-green-600 text-white px-3 py-2 rounded'
                        : 'px-3 py-2'
                }
            >
                <li>Home</li>
            </NavLink>

            <NavLink
                to="/allneedpost"
                onClick={() => setShowDropdown(false)}
                className={({ isActive }) =>
                    isActive
                        ? 'bg-green-600 text-white px-3 py-2 rounded'
                        : 'px-3 py-2'
                }
            >
                <li>All Volunteer Need Post</li>
            </NavLink>

            {user && (
                <>
                    <NavLink
                        to="/addvoluntieer"
                        onClick={() => setShowDropdown(false)}
                        className={({ isActive }) =>
                            isActive
                                ? 'bg-green-600 text-white px-3 py-2 rounded'
                                : 'px-3 py-2'
                        }
                    >
                        <li>Add Need Volunteer</li>
                    </NavLink>

                    {/* Dropdown for Manage Posts */}
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className={`px-3 py-2 rounded transition-all duration-300 ${showDropdown ? 'bg-green-700 text-white' : 'hover:bg-green-600 hover:text-white'
                                }`}
                        >
                            Manage My Post ▾
                        </button>

                        {showDropdown && (
                            <ul className="absolute bg-white text-black shadow-xl rounded-xl mt-2 z-50 w-60 border border-green-200">
                                <li>
                                    <NavLink
                                        to="/my-need-posts"
                                        onClick={() => setShowDropdown(false)}
                                        className="block px-4 py-2 hover:bg-green-600 hover:text-white rounded-t-xl"
                                    >
                                        My Volunteer Need Post
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/my-request-posts"
                                        onClick={() => setShowDropdown(false)}
                                        className="block px-4 py-2 hover:bg-green-600 hover:text-white rounded-b-xl"
                                    >
                                        My Volunteer Request Post
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </div>
                </>
            )}
        </>
    );


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
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow gap-4">
                            {
                                Links
                            }
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Volunteer management</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-4">
                        {
                            Links
                        }
                    </ul>
                </div>

                <div className="navbar-end">
                    {
                        user ? <>
                            <div className="avatar">
                                <div className="ring-primary ring-offset-base-100 w-6 h-6 rounded-full ring-2 ring-offset-2 mr-4">
                                    <img className='w-2 h-2' src={user.photoURL} />
                                </div>
                            </div>

                            <button onClick={handleLogout} className='btn bg-green-600 text-white'>Log Out</button>
                        </> : <>
                            <Link to='/signup' className='mr-4'> <button className='btn bg-green-600 text-white'>Registration</button> </Link>
                            <Link to='/login'><button className='btn bg-green-600 text-white'>Log In</button></Link>
                        </>

                    }
                </div>
            </div>

        </div>
    );
};

export default Navbar;