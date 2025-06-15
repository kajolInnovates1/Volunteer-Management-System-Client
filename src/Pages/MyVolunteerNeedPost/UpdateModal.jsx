import React, { useState } from 'react';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAuth from '../../Hooks/useAuth';

const categories = ['Healthcare', 'Education', 'Social Service', 'Animal Welfare'];

const UpdateModal = ({ post, onClose, onUpdated }) => {
    const { user } = useAuth();


    // : 
    // "Social Service"

    // : 
    // "2025-06-22"

    // : 
    // "Help us plant 500 trees across Uttara to build a greener future."

    // : 
    // "Uttara, Dhaka"

    // : 
    // {name: 'Md Kajol Islam', email: 'mdkajolislam@gmail.com'}

    // : 
    // "Tree Plantation Campaign"
    // status
    // : 
    // "requested"
    // suggestion
    // : 
    // "query off date"

    // : 
    // "https://i.ibb.co/rfyLdPWC/v2.jpg"

    // : 
    // "14"
    // _id
    // : 
    // "684e81443e3b00298a7a2143"

    const [formData, setFormData] = useState({
        ...post
    });
    console.log(post);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = date => {
        setFormData(prev => ({ ...prev, deadline: date }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const toForm = new FormData(form);
        const data = Object.fromEntries(toForm.entries());

        // organizer nested object banai
        data.organizer = {
            name: formData.organizer?.name || '',
            email: formData.organizer?.email || ''
        };

        // Extra unnecessary field delete
        delete data.name;
        delete data.email;

        // fix deadline
        data.deadline = formData.deadline;

        // include suggestion and status
        data.status = formData.status;
        data.suggestion = formData.suggestion;

        // volunteersNeeded field should be number
        data.volunteersNeeded = parseInt(data.volunteersNeeded);

        fetch(`http://localhost:3000/volunteerNeeds/${post._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(() => {
                Swal.fire('Updated!', 'Volunteer post updated successfully.', 'success');
                onClose();
                onUpdated(); // refresh parent list
            });
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl relative">
                <h3 className="text-2xl font-bold mb-4 text-center text-green-700">Update Volunteer Post</h3>

                <label>Thumbnail</label>
                <input
                    type="text"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-3"
                />

                <label>Post Title</label>
                <input
                    type="text"
                    name="postTitle"
                    value={formData.postTitle}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-3"
                />

                <label>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full mb-3"
                />

                <label>Category</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="select select-bordered w-full mb-3"
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <label>Location</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-3"
                />

                <label>Volunteers Needed</label>
                <input
                    type="number"
                    name="volunteersNeeded"
                    value={formData.volunteersNeeded}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-3"
                />

                <label>Deadline</label>
                <DatePicker
                    selected={formData.deadline}
                    onChange={handleDateChange}
                    name='deadline'
                    className="input input-bordered w-full mb-3"
                    dateFormat="yyyy-MM-dd"
                />

                <label>Organizer Name</label>
                <input
                    type="text"
                    name='name'
                    value={formData.organizer?.name || ''}

                    className="input input-bordered w-full mb-3 bg-gray-100"
                />

                <label>Organizer Email</label>
                <input
                    type="email"
                    name='email'
                    value={formData.organizer?.email || ''}

                    className="input input-bordered w-full mb-3 bg-gray-100"
                />

                <div className="flex justify-end space-x-3">
                    <button type="submit" className="btn btn-success">
                        Update Post
                    </button>
                    <button type="button" onClick={onClose} className="btn btn-outline btn-error">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateModal;
