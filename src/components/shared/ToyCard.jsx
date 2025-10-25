import React from 'react';
import { Link } from 'react-router-dom';
import { FaDollarSign, FaStarHalfAlt, FaRegStar, FaStar } from 'react-icons/fa';

const renderRatingStars = (rating) => {
    const totalStars = 5;
    const stars = [];
    const ratingValue = parseFloat(rating);

    for (let i = 1; i <= totalStars; i++) {
        if (i <= ratingValue) {
            stars.push(<FaStar key={i} className="text-yellow-500 w-4 h-4" />);
        } else if (i === Math.ceil(ratingValue) && ratingValue % 1 !== 0) {
            stars.push(<FaStarHalfAlt key={i} className="text-yellow-500 w-4 h-4" />);
        } else {
            stars.push(<FaRegStar key={i} className="text-yellow-500 w-4 h-4 opacity-50" />);
        }
    }
    return <div className="flex items-center space-x-0.5">{stars}</div>;
};

const ToyCard = ({ toy }) => (
    <div className="card bg-base-100 shadow-xl transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] 
        w-[270px] h-[400px] mx-auto flex flex-col overflow-hidden">

        <figure className="p-4 pt-6 flex-shrink-0 h-[180px] bg-white">
            <img
                src={toy.pictureURL}
                alt={toy.toyName}
                className="rounded-xl h-full w-full object-contain"
            />
        </figure>

        <div className="card-body p-4 pt-2 flex flex-col justify-between flex-grow">
            <div>
                <p className="font-light text-sm text-gray-500">{toy.Category}</p>
                <h2 className="card-title text-xl font-bold line-clamp-2">{toy.toyName}</h2>

                <div className="flex justify-between items-center text-md font-semibold mt-1">
                    <span className="flex items-center">
                        {renderRatingStars(toy.rating)}
                    </span>
                    <span className="text-gray-600 text-sm">
                        Stock: {toy.availableQuantity}
                    </span>
                </div>
            </div>

            <div className="mt-2">
                <p className='mt-2 text-2xl font-bold text-primary flex items-center'>
                    <FaDollarSign className='w-4 h-4' />{toy.price}
                </p>
                <div className="card-actions justify-end mt-2">
                    <Link to={`/toy/${toy.toyId}`} className="btn btn-secondary btn-sm">
                        View More
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

export default ToyCard;