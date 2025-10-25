import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const RatingForm = ({ isLoggedIn, productId }) => {
    if (!isLoggedIn) {
        return null;
    }

    const [currentRating, setCurrentRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const handleSubmitRating = (rating) => {
        console.log(`Submitting rating of ${rating} for Product ID: ${productId}`);

        setCurrentRating(rating);
        setHoverRating(0);
    };

    const stars = [1, 2, 3, 4, 5];

    return (
        <div className="p-6 border rounded-xl shadow-lg bg-white mt-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Give Rating:</h3>

            <div className="flex space-x-1">
                {stars.map((starValue) => (
                    <span
                        key={starValue}
                        onClick={() => handleSubmitRating(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="cursor-pointer transition-colors duration-200"
                    >
                        {(hoverRating || currentRating) >= starValue ? (
                            <FaStar className="w-8 h-8 text-yellow-500 hover:scale-110" />
                        ) : (
                            <FaRegStar className="w-8 h-8 text-yellow-400 hover:scale-110" />
                        )}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default RatingForm;