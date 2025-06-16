import React, { useState } from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router';
import {
    FaMapMarkerAlt,
    FaUser,
    FaEnvelope,
    FaCalendarAlt,
    FaTag,
    FaUsers,
    FaTimes,
} from 'react-icons/fa';

import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const DetailsPage = () => {
    const data = useLoaderData();
    // dynamic data from loader
    const [showModal, setShowModal] = useState(false);
    const [userSuggestion, setUserSuggestion] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();
    const locationn = useLocation();
    const axiosSecure = useAxiosSecure();

    const handlebeClick = () => {
        if (data.volunteersNeeded <= 0) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You Can not added Because Volunteer will be 0!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
        if (!user) {

            navigate('/login', { state: { from: locationn.pathname } });
            return;
        }

        setShowModal(true);

    }


    const {
        category,
        deadline,
        description,
        location,
        organizer,
        postTitle,
        status,
        suggestion,
        thumbnail,
        volunteersNeeded,
        _id
    } = data;


    const playdata = {
        thumbnail: thumbnail,
        postTitle: postTitle,
        description: description,
        category: category,
        location: location,
        deadline: deadline,
        volunteersNeeded: volunteersNeeded,
        organizer: {
            name: organizer?.name,
            email: organizer?.email
        },
        volunteer: {
            name: user?.displayName,
            email: user?.email
        },
        suggestion: suggestion,
        status: status,

    };



    const handleRequest = () => {




        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Requested Submitted!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Submited!",
                    text: "Your Request has been Submitted.",
                    icon: "success"
                });
                axiosSecure.patch(`http://localhost:3000/allvoluntier/${_id}`);
                axiosSecure.post('http://localhost:3000/volunteerRequests', playdata);
                navigate('/my-request-posts')
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your request has been Cancel",
                    icon: "error"
                });
            }
        });




    };


    return (
        <div className="max-w-5xl mx-auto my-10 p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
            <img
                src={thumbnail || 'https://i.ibb.co/7V2zpXP/volunteer-cleanup.jpg'}
                alt={postTitle || 'Volunteer Post'}
                className="w-full h-64 object-cover rounded-xl mb-6"
            />

            <div className="space-y-4">
                <h2 className="text-3xl font-bold">{postTitle}</h2>
                <p className="text-gray-600">{description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div className="flex items-center gap-2"><FaUser /> Organizer: {organizer?.name}</div>
                    <div className="flex items-center gap-2"><FaEnvelope /> {organizer?.email}</div>
                    <div className="flex items-center gap-2"><FaMapMarkerAlt /> {location}</div>
                    <div className="flex items-center gap-2"><FaCalendarAlt /> Deadline: {deadline}</div>
                    <div className="flex items-center gap-2"><FaTag /> Category: {category}</div>
                    <div className="flex items-center gap-2"><FaUsers /> Volunteers Needed: {volunteersNeeded}</div>
                </div>

                <div className="bg-gray-50 p-5 rounded-xl mt-6 space-y-3">
                    <h3 className="text-xl font-semibold">Your Info</h3>
                    <p><strong>Name:</strong> {user?.displayName}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Status:</strong> requested</p>




                    <button
                        onClick={handlebeClick}
                        className="mt-3 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-200"
                    >
                        Be a Volunteer
                    </button>

                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
                    <div className="bg-white rounded-xl p-6 max-w-2xl w-full relative shadow-2xl">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
                        >
                            <FaTimes size={20} />
                        </button>

                        <h2 className="text-2xl font-bold mb-4 text-center text-green-700">Be a Volunteer</h2>

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
                            <p><strong>Title:</strong> {postTitle}</p>
                            <p><strong>Category:</strong> {category}</p>
                            <p><strong>Location:</strong> {location}</p>
                            <p><strong>Deadline:</strong> {deadline}</p>
                            <p><strong>Volunteers Needed:</strong> {volunteersNeeded}</p>
                            <p><strong>Organizer:</strong> {organizer?.name}</p>
                            <p><strong>Organizer Email:</strong> {organizer?.email}</p>
                            <p><strong>Your Name:</strong> {user?.displayName}</p>
                            <p><strong>Your Email:</strong> {user?.email}</p>
                            <p><strong>Status:</strong> requested</p>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Suggestion</label>
                            <textarea
                                value={userSuggestion}
                                onChange={(e) => setUserSuggestion(e.target.value)}
                                className="w-full p-2 border rounded-md"
                                rows={3}
                                placeholder="Write your suggestion (optional)..."
                            />
                        </div>

                        <button
                            onClick={handleRequest}
                            className="mt-5 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full"
                        >
                            Request
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailsPage;
