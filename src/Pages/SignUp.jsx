import React from 'react';
import useAuth from '../Hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';

const SignUp = () => {
    const { userSignUp, setUser, userUpdate, userSignInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());
        const { name, url, email, password } = userData;
        const newData = {
            displayName: name,
            photoURL: url,
            email: email
        }
        const dataInfo = {
            displayName: name,
            photoURL: url
        }


        userSignUp(email, password)
            .then(res => {
                setUser(res.user);
                userUpdate(dataInfo)
                    .then(() => {

                        axios.post('http://localhost:3000/user', newData)
                            .then(resu => {
                                if (resu) {
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: "Registration Succesfull",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });

                                }

                            })
                            .catch(error => {
                                if (error) {
                                    Swal.fire({
                                        position: "center",
                                        icon: "warning",
                                        title: "Registration Failed",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });


                                }
                            })


                    })
                    .catch(errorr => {
                        if (errorr) {
                            Swal.fire({
                                position: "center",
                                icon: "warning",
                                title: "Registration Failed",
                                showConfirmButton: false,
                                timer: 1500
                            });

                        }


                    });
                if (res.user) {
                    navigate('/');

                }
            })
            .catch(errors => {
                if (errors) {
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: "Registration Failed",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            });
    }
    const handleGoogle = () => {
        userSignInWithGoogle()
            .then(result => {
                const newData = {
                    displayName: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL
                }
                axios.post('http://localhost:3000/user', newData)
                    .then(resu => {
                        if (resu) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Registration Succesfull",
                                showConfirmButton: false,
                                timer: 1500
                            });

                        }

                    })
                    .catch(error => {
                        if (error) {
                            Swal.fire({
                                position: "center",
                                icon: "warning",
                                title: "Registration Failed",
                                showConfirmButton: false,
                                timer: 1500
                            });


                        }
                    })
                if (result.user) {
                    navigate('/');

                }


            })
            .catch(error => {
                if (error) {
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: "Registration Failed",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    }


    return (
        <div className="min-h-[calc(100vh-290px)]">
            <form onSubmit={handleSignUp}>
                <div className="hero bg-base-200 ">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="card bg-base-100 w-full   shadow-2xl">
                            <div className="card-body">
                                <h1 className='text-3xl text-center text-[#132182]'>Registration</h1>
                                <fieldset className="fieldset">
                                    <label className="label">Name</label>
                                    <input type="text" name='name' className="input" placeholder="Name" />
                                    <label className="label">Photo URL</label>
                                    <input type="url" name='url' className="input" placeholder="photo URL" />
                                    <label className="label">Email</label>
                                    <input type="email" name='email' className="input" placeholder="Email" />
                                    <label className="label">Password</label>
                                    <input type="password" name='password' className="input" placeholder="Password" />
                                    <div><a className="link link-hover">Forgot password?</a></div>
                                    <button className="btn bg-[#132182] text-white mt-4">Sign Up</button>
                                    <p className='text-xl text-green-600 mt-2'>Allready have an Account please! <Link to={'/login'} className='underline text-blue-500'>Log In</Link></p>

                                </fieldset>
                                <div className="divider">OR</div>
                                <div>
                                    <button onClick={handleGoogle} className="btn bg-white text-black w-full border-[#e5e5e5]">
                                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                        Login with Google
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUp;