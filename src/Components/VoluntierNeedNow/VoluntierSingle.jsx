import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router';

const VoluntierSingle = ({ singledata }) => {
    const {
        _id,

        postTitle,
        category,
        deadline,
        location,
        thumbnail
    } = singledata;

    return (
        <div>
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
                <img
                    src={thumbnail || "https://cdn.pixabay.com/photo/2016/12/07/08/17/volunteer-1888823_1280.png"}
                    alt="Post Thumbnail"
                    className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                    <h3 className="text-xl font-semibold">{
                        postTitle || "Untitled Post"}</h3>
                    <p className="text-sm text-gray-600">Category: {category}</p>
                    <p className="text-sm text-red-600 font-medium">Deadline: {deadline}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                        <FaMapMarkerAlt className="text-blue-500" />
                        <span>{location}</span>
                    </div>
                    <Link to={`/detailspage/${_id}`}>
                        <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-800 transition duration-200">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VoluntierSingle;
