import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';

const MyVolunteerNeedPosts = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/allvoluntier?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setPosts(data));
    }, [user]);

    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/allvoluntier/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
                            setPosts(posts.filter(post => post._id !== id));
                        }
                    });
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">My Volunteer Need Posts</h2>

            {posts.length === 0 ? (
                <div className="text-center text-gray-500 text-lg">You haven’t added any volunteer need posts yet.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border shadow-xl rounded-xl">
                        <thead className="bg-green-600 text-white">
                            <tr>
                                <th className="p-3 text-left">Thumbnail</th>
                                <th className="p-3 text-left">Title</th>
                                <th className="p-3 text-left">Category</th>
                                <th className="p-3 text-left">Location</th>
                                <th className="p-3 text-left">Volunteers Needed</th>
                                <th className="p-3 text-left">Deadline</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map(post => (
                                <tr key={post._id} className="border-b hover:bg-gray-100">
                                    <td className="p-3">
                                        <img src={post.thumbnail} alt="thumb" className="w-16 h-16 rounded object-cover" />
                                    </td>
                                    <td className="p-3">{post.postTitle}</td>
                                    <td className="p-3">{post.category}</td>
                                    <td className="p-3">{post.location}</td>
                                    <td className="p-3">{post.volunteersNeeded}</td>
                                    <td className="p-3">{post.deadline}</td>
                                    <td className="p-3 space-x-2">
                                        <Link
                                            to={`/dashboard/updatePost/${post._id}`}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                        >
                                            Update
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyVolunteerNeedPosts;
