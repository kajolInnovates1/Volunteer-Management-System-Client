import React from 'react';
import useAuth from '../Hooks/useAuth';

const SignUp = () => {
    const { ami } = useAuth();
    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());
        console.log(userData);
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
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUp;