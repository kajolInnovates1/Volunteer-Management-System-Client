import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-white">
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center p-8 bg-white shadow-2xl rounded-3xl max-w-md"
            >
                <h1 className="text-7xl font-extrabold text-green-600 mb-4">404</h1>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Page not found.</h2>
                <p className="text-gray-600 mb-6">
                    The page you are looking for doesn’t exist or has been moved.
                </p>
                <Link to="/">
                    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-lg">
                        ⬅ Go Home
                    </button>
                </Link>
            </motion.div>
        </div>
    );
};

export default ErrorPage;
