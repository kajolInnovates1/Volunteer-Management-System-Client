import React, { useState } from 'react';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const categories = ['Healthcare', 'Education', 'Social Service', 'Animal Welfare'];

const UpdateModal = ({ post, onClose, onUpdated }) => {
    const axiosSecure = useAxiosSecure();

    // Initialize formData state from post prop
    const [formData, setFormData] = useState({
        ...post,
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = date => {
        setFormData(prev => ({ ...prev, deadline: date }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const toForm = new FormData(form);
        const data = Object.fromEntries(toForm.entries());

        // organizer nested object আলাদা করে বসাও
        data.organizer = {
            name: formData.organizer?.name || '',
            email: formData.organizer?.email || ''
        };

        // name ও email ফিল্ড সরিয়ে দাও যেহেতু readOnly
        delete data.name;
        delete data.email;

        // date formatting ঠিক করে নিও
        if (formData.deadline instanceof Date) {
            data.deadline = formData.deadline.toISOString().split('T')[0];
        } else {
            data.deadline = formData.deadline;  // যদি string হয়ে থাকে
        }

        // অন্য কিছু ফিল্ড সরাসরি formData থেকে নেয়া ভালো
        data.status = formData.status || 'pending';  // example default
        data.suggestion = formData.suggestion || '';

        // volunteersNeeded string → number (fallback 0)
        data.volunteersNeeded = parseInt(data.volunteersNeeded) || 0;

        try {
            const res = await axiosSecure.put(`/volunteerNeeds/${post._id}`, data);

            if (res.status === 200 && (res.data.modifiedCount > 0 || res.data.acknowledged)) {
                await Swal.fire('Updated!', 'Volunteer post updated successfully.', 'success');
                onClose();
                onUpdated();
            } else {
                Swal.fire('No Change', 'No fields were updated.', 'info');
            }
        } catch (error) {
            console.error('Update failed:', error);
            Swal.fire('Error!', error?.response?.data?.message || 'Something went wrong.', 'error');
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl relative">
                <h3 className="text-2xl font-bold mb-4 text-center text-green-700">Update Volunteer Post</h3>

                <label>Thumbnail</label>
                <input
                    type="text"
                    name="thumbnail"
                    value={formData.thumbnail || ''}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-3"
                />

                <label>Post Title</label>
                <input
                    type="text"
                    name="postTitle"
                    value={formData.postTitle || ''}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-3"
                />

                <label>Description</label>
                <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full mb-3"
                />

                <label>Category</label>
                <select
                    name="category"
                    value={formData.category || ''}
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
                    value={formData.location || ''}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-3"
                />

                <label>Volunteers Needed</label>
                <input
                    type="number"
                    name="volunteersNeeded"
                    value={formData.volunteersNeeded || ''}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-3"
                    min={0}
                />

                <label>Deadline</label>
                <DatePicker
                    selected={formData.deadline ? new Date(formData.deadline) : null}
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
                    readOnly
                    className="input input-bordered w-full mb-3 bg-gray-100 cursor-not-allowed"
                />

                <label>Organizer Email</label>
                <input
                    type="email"
                    name='email'
                    value={formData.organizer?.email || ''}
                    readOnly
                    className="input input-bordered w-full mb-3 bg-gray-100 cursor-not-allowed"
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
