import React from 'react';

const LogIn = () => {
    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());

    }
    return (
        <div className="min-h-[calc(100vh-290px)]">
            <form onSubmit={handleSignIn}>
                <div className="hero bg-base-200 ">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="card bg-base-100 w-full   shadow-2xl">
                            <div className="card-body">
                                <h1 className='text-3xl text-center text-[#132182]'>Log In</h1>
                                <fieldset className="fieldset">
                                    <label className="label">Email</label>
                                    <input type="email" name='email' className="input" placeholder="Email" />
                                    <label className="label">Password</label>
                                    <input type="password" name='password' className="input" placeholder="Password" />
                                    <div><a className="link link-hover">Forgot password?</a></div>
                                    <button className="btn bg-[#132182] text-white mt-4">Sign In</button>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LogIn;