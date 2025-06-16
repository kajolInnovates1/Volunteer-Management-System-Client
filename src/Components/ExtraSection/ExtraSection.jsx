import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            when: "beforeChildren",
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
        },
    },
};

const ExtraSection = () => {
    return (
        <motion.div
            className="p-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.div className="bg-green-50 p-8 rounded-xl shadow my-12">
                <h2 className="text-2xl font-bold text-green-700 mb-6">Your Volunteer Impact</h2>
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center"
                    variants={containerVariants} // container for stagger inside cards
                >
                    {[
                        { number: '12', label: 'Campaigns Joined' },
                        { number: '96', label: 'Hours Contributed' },
                        { number: '5', label: 'Causes Supported' },
                        { number: '🏅', label: 'Achievement: Silver Volunteer' },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-default"
                            variants={itemVariants}
                        >
                            <h3 className="text-3xl font-bold text-green-600">{item.number}</h3>
                            <p className="text-gray-500 mt-2">{item.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            <motion.div
                className="mt-16 bg-green-50 p-8 rounded-xl shadow"
                variants={itemVariants}
            >
                <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">🌟 Why Volunteer With Us?</h2>
                <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
                    <li>Make a real impact in your community</li>
                    <li>Join a network of passionate individuals</li>
                    <li>Gain valuable experience and skills</li>
                    <li>Earn recognition and certificates</li>
                </ul>
            </motion.div>
        </motion.div>
    );
};

export default ExtraSection;
