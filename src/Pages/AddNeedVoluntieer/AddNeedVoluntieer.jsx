import React from 'react';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AddNeedVoluntieer = () => {
    const { user } = useAuth();
    const useremail = user?.email;
    const navigate = useNavigate();
    const userdisplayName = user?.displayName;
    const axiosSecure = useAxiosSecure();
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const dataInfo = Object.fromEntries(formData.entries());

        const { displayName, email, ...newData } = dataInfo;

        newData.organizer = {
            name: displayName,
            email: email
        };



        axiosSecure.post('/addvoluntieer', newData)
            .then(res => {
                if (res) {
                    let timerInterval;
                    Swal.fire({
                        title: "Added volunteer needed Post!",
                        html: "Please Wait <b></b> milliseconds.",
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading();
                            const timer = Swal.getPopup().querySelector("b");
                            timerInterval = setInterval(() => {
                                timer.textContent = `${Swal.getTimerLeft()}`;
                            }, 100);
                        },
                        willClose: () => {
                            clearInterval(timerInterval);
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */

                    });

                    setTimeout(() => {
                        navigate('/my-need-posts'); // replace '/your-route' with your actual path
                    }, 2500);



                }
            });





    }
    return (
        <div className='min-h-[calc(100vh-290px)] px-8'>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow-xl">

                {/* Thumbnail URL */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-700">Thumbnail URL</label>
                    <input
                        type="url"
                        name="thumbnail"
                        placeholder="Enter image URL"
                        required
                        className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>

                {/* Post Title */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-700">Post Title</label>
                    <input
                        type="text"
                        name="postTitle"
                        placeholder="Enter post title"
                        required
                        className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col md:col-span-2">
                    <label className="mb-1 font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        placeholder="Write short description..."
                        required
                        className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                        rows={3}
                    />
                </div>

                {/* Category */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-700">Category</label>
                    <select
                        name="category"
                        required
                        className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        <option value="">Select Category</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Social Service">Social Service</option>
                        <option value="Animal Welfare">Animal Welfare</option>
                    </select>
                </div>

                {/* Location */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-700">Location</label>
                    <input
                        type="text"
                        name="location"
                        placeholder="Enter location"
                        required
                        className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>

                {/* Volunteers Needed */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-700">Volunteers Needed</label>
                    <input
                        type="number"
                        name="volunteersNeeded"
                        placeholder="Number of volunteers"
                        required
                        className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>

                {/* Deadline */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-700">Deadline</label>
                    <input
                        type="date"
                        name="deadline"
                        required
                        className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>

                {/* Suggestion */}
                <div className="flex flex-col md:col-span-2">
                    <label className="mb-1 font-medium text-gray-700">Suggestion (optional)</label>
                    <textarea
                        name="suggestion"
                        placeholder="Write any suggestion..."
                        className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                        rows={3}
                    />
                </div>

                {/* Status */}


                {/* Organizer Info (Readonly) */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-700">Your Name</label>
                    <input
                        type="text"
                        value={userdisplayName}
                        name="displayName"
                        readOnly
                        className="p-3 border rounded-xl bg-gray-100 cursor-not-allowed"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-700">Your Email</label>
                    <input
                        type="email"
                        name="email"
                        value={useremail}
                        readOnly
                        className="p-3 border rounded-xl bg-gray-100 cursor-not-allowed"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label className="mb-1 font-medium text-gray-700">Status</label>
                    <input
                        type="text"
                        name="status"
                        placeholder="e.g., requested"
                        required
                        className="p-3 border  border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-all duration-300"
                    >
                        Add Post
                    </button>
                </div>
            </form>



        </div>
    );
};

export default AddNeedVoluntieer;