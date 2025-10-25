import { useLoaderData, useParams } from 'react-router-dom';
import useDynamicTitle from '../hooks/useDynamicTitle';
import { FaDollarSign, FaStar, FaWarehouse, FaRegStar, FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';


const renderRatingStars = (rating) => {
    const totalStars = 5;
    const ratingValue = parseFloat(rating) || 0;
    const stars = [];

    for (let i = 0; i < totalStars; i++) {
        if (i < Math.floor(ratingValue)) {
            stars.push(<FaStar key={i} className="text-yellow-500 w-5 h-5"/>);
        }
        else if (i === Math.floor(ratingValue) && ratingValue % 1 !== 0) {
            stars.push(<FaStar key={i} className="text-yellow-500 w-5 h-5 opacity-50"/>);
        }
        else {
            stars.push(<FaRegStar key={i} className="text-yellow-500 w-5 h-5 opacity-70"/>);
        }
    }
    return <div className="flex items-center space-x-1">{stars}</div>;
};


const ReviewCard = ({ review }) => (
    <div className="p-4 border rounded-lg bg-gray-50 shadow-sm mb-4">
        <div className="flex items-center mb-2">
            <FaUserCircle className="w-6 h-6 text-gray-400 mr-3" />
            <div>
                <p className="font-semibold text-gray-800">{review.userName}</p>
                <div className='flex items-center'>
                    {renderRatingStars(review.rating)}
                    <span className="text-sm text-gray-500 ml-2">({review.rating} Star)</span>
                </div>
            </div>
        </div>
        <p className="text-gray-700 mt-2 p-3 rounded-md border border-gray-200">
            {review.comment}
        </p>
    </div>
);


const ToyDetails = () => {
    const { user } = useContext(AuthContext);
    const allToys = useLoaderData();
    const { id } = useParams();
    const toyId = parseInt(id);
    const toy = allToys.find(t => t.toyId === toyId);

    useDynamicTitle(toy ? `${toy.toyName} Details` : "Toy Not Found");

    if (!toy) {
        return <div className="text-center py-20 min-h-screen">
            <h1 className="text-4xl font-bold text-red-600">404 - Toy Data Not Found!</h1>
            <p className="mt-4">The toy you are looking for might be out of stock or was never here.</p>
        </div>;
    }

    const [currentAvgRating, setCurrentAvgRating] = useState(toy.rating);
    const [submittedRating, setSubmittedRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [allReviews, setAllReviews] = useState([]);


    const { toyName, price, availableQuantity, description, pictureURL, subCategory } = toy;


    const handleSubmitRating = (ratingToSubmit, submittedComment) => {

        const oldRating = parseFloat(currentAvgRating);
        const totalRatings = allReviews.length + 1;
        const newAvg = totalRatings === 1 ? ratingToSubmit : ((oldRating * allReviews.length) + ratingToSubmit) / totalRatings;
        const updatedRating = Math.min(5, newAvg).toFixed(1);

        setCurrentAvgRating(updatedRating);

        const newReview = {
            id: Date.now(),
            userName: user.displayName || user.email.split('@')[0],
            rating: ratingToSubmit,
            comment: submittedComment || 'কোনো মন্তব্য নেই',
            timestamp: new Date().toLocaleDateString(),
        };

        setAllReviews(prevReviews => [newReview, ...prevReviews]);
        setSubmittedRating(ratingToSubmit);

        toast.success(`Thanks For Your Ratings and Comment`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
        });

        setComment('');
        setSelectedRating(0);
    };

    const handleStarClick = (starValue) => {
        if (!user || submittedRating > 0) return;
        setHoverRating(0);
        setSelectedRating(starValue);
    };

    const handleRatingFormSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            toast.error('Please Login to give ratings', { position: "top-right", autoClose: 3000 });
            return;
        }

        if (submittedRating > 0) {
            toast.warn('You have already submitted review and comment', { position: "top-center" });
            return;
        }

        if (selectedRating === 0) {
            toast.error('Please give at least 1 Star', { position: "top-center" });
            return;
        }

        handleSubmitRating(selectedRating, comment);
    };

    const handleTryNow = (e) => {
        e.preventDefault();

        if (!user) {
            toast.warn('Please Login first to try');
            return;
        }

        toast.success(`Success! ${toyName} is ready for trial. Check your email for details.`);
    };

    const displayRating = submittedRating || selectedRating || hoverRating;
    const isSubmitted = submittedRating > 0;
    const canSubmit = user && selectedRating > 0 && !isSubmitted;


    return (
        <div className="container mx-auto p-4 md:p-8 min-h-screen">
            <h1 className="text-4xl font-extrabold text-center text-primary mb-10 border-b pb-4">
                {toyName}
            </h1>

            <div className="flex flex-col lg:flex-row gap-10 bg-white p-6 md:p-10 rounded-xl shadow-2xl">
                <div className="lg:w-1/2 flex justify-center items-start">
                    <img 
                        src={pictureURL} 
                        alt={toyName} 
                        className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg transition-transform duration-500 hover:scale-[1.02]" 
                    />
                </div>

                <div className="lg:w-1/2 space-y-6">
                    <h2 className="text-3xl font-bold text-gray-800">{toyName}</h2>
                    <p className="text-gray-600 text-lg">{description}</p>
                    
                    <div className="flex flex-wrap gap-4 items-center">
                        <span className="badge badge-lg badge-success text-white text-xl p-4">
                            <FaDollarSign /> {price}
                        </span>
                        <span className="badge badge-lg badge-outline text-lg p-4">
                            <FaWarehouse /> Qty: {availableQuantity}
                        </span>
                        <span className="flex items-center text-xl text-yellow-500">
                            {renderRatingStars(currentAvgRating)} 
                            <span className='ml-2 text-gray-600'>({currentAvgRating})</span>
                        </span>
                    </div>

                    
                    <div className="mt-10 p-6 border rounded-xl shadow-lg bg-blue-50/70">
                        <h3 className="text-2xl font-bold mb-4 text-blue-700">Give Review:</h3>
                        
                        {!user && (
                            <div className="bg-red-100 p-3 rounded-lg text-red-700 mb-4">
                               You have to Login first
                            </div>
                        )}

                        <form onSubmit={handleRatingFormSubmit}>
                            <div className={`flex space-x-1 mb-4 ${!user || isSubmitted ? 'opacity-50 pointer-events-none' : ''}`}>
                                {[1, 2, 3, 4, 5].map((starValue) => (
                                    <span
                                        key={starValue}
                                        onClick={() => handleStarClick(starValue)}
                                        onMouseEnter={() => setHoverRating(starValue)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="cursor-pointer transition-colors duration-200"
                                    >
                                        {displayRating >= starValue ? (
                                            <FaStar className="w-6 h-6 text-yellow-500 hover:scale-110"/>
                                        ) : (
                                            <FaRegStar className="w-6 h-6 text-yellow-400 hover:scale-110"/>
                                        )}
                                    </span>
                                ))}
                                {selectedRating > 0 && !isSubmitted && <p className="ml-4 font-bold text-green-700">({selectedRating} Star Selected)</p>}
                                {isSubmitted && <p className="ml-4 font-bold text-green-700">({submittedRating} Star Given)</p>}
                            </div>
                            
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text font-semibold"> Comment (Optional):</span>
                                </label>
                                <textarea
                                    className="textarea text-gray-400 h-24 w-full"
                                    placeholder="Write here..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    disabled={!user || isSubmitted}
                                    maxLength={300}
                                ></textarea>
                                <div className='text-right text-sm text-gray-500'>
                                    {comment.length} / 300
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={`btn btn-primary w-full ${!canSubmit ? 'btn-disabled' : ''}`}
                                disabled={!canSubmit}
                            >
                                {isSubmitted ? 'Submitted' : 'Submit'}
                            </button>
                        </form>
                    </div>

                    <div className="mt-10 p-6 border-2 border-dashed border-secondary rounded-xl bg-secondary/10">
                        <h3 className="text-2xl font-bold text-secondary mb-4">Try This Toy Now!</h3>
                        <form onSubmit={handleTryNow} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Your Name</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Enter your name" 
                                    defaultValue={user?.displayName || ''}
                                    className="input input-bordered w-full" 
                                    required 
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Your Email</span>
                                </label>
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    defaultValue={user?.email || ''}
                                    className="input input-bordered w-full" 
                                    readOnly 
                                    required 
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button 
                                    type="submit" 
                                    className={`btn w-full ${!user ? 'btn-disabled bg-gray-400' : 'btn-secondary'}`}
                                    disabled={!user}
                                >
                                    Try Now
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

            <hr className='my-10'/>
            
            <div className="mt-12 p-4">
                <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-l-4 border-yellow-500 pl-4">
                    Ratings and Comments ({allReviews.length})
                </h2>

                {allReviews.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                        {allReviews.map(review => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-10 bg-gray-100 rounded-lg">
                        <p className="text-gray-500 text-lg">No Review Found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ToyDetails;