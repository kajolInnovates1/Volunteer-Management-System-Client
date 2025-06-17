import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    "https://i.postimg.cc/7ZnkvRxx/v-12.jpg",
    "https://i.postimg.cc/vBL95byJ/v11.jpg",
    "https://i.postimg.cc/9FN9dx3Q/v-9.jpg",
    "https://i.postimg.cc/d1vZspC4/v-8.jpg"
];

const Banner = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-lg mt-8">
            <AnimatePresence mode="wait">
                <motion.img
                    key={images[current]}
                    src={images[current]}
                    alt={`Slide ${current + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute w-full h-full object-cover"
                />
            </AnimatePresence>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full ${current === index ? 'bg-white' : 'bg-gray-400'} hover:bg-white`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;
