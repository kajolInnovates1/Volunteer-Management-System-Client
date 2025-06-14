import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const VoluntierSingle = ({ singledata }) => {
    return (
        <div>

            <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
                <img
                    src="https://cdn.pixabay.com/photo/2016/12/07/08/17/volunteer-1888823_1280.png"
                    alt="Post Thumbnail"
                    className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                    <h3 className="text-xl font-semibold">Winter Clothes Distribution</h3>
                    <p className="text-sm text-gray-600">Category: Community Service</p>
                    <p className="text-sm text-red-600 font-medium">Deadline: 20 June 2025</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                        <FaMapMarkerAlt className="text-blue-500" />
                        <span>Dhaka, Bangladesh</span>
                    </div>
                    <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-200">
                        View Details
                    </button>
                </div>
            </div>

        </div>
    );
};

export default VoluntierSingle;