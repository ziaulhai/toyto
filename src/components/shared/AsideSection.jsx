import React from 'react';
import { Link } from 'react-router-dom';

const AsideCard = ({ toy }) => {
    return (
        <Link to={`/toy/${toy.toyId}`}>
            <div className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition duration-200 border-b border-gray-100 last:border-b-0">
                
                <div className="w-16 h-16 flex-shrink-0">
                    <img src={toy.pictureURL} alt={toy.toyName} className="w-full h-full object-cover rounded-xl shadow-md"/>
                </div>

                <div className="flex-grow">
                    <p className="text-xs font-semibold text-gray-500 mb-1">{toy.Category}</p>
                    <h3 className="text-sm font-bold text-gray-800 leading-snug line-clamp-2">
                        {toy.toyName}
                    </h3>
                    
                    <div className="flex items-center mt-1">
                        <span className="text-lg font-extrabold text-green-600 mr-2">${toy.price}</span>
                        <span className="text-sm text-gray-400 line-through">
                            {toy.price ? `$${(toy.price * 1.2).toFixed(2)}` : null}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const AsideSection = ({ featuredSectionToys }) => {
    if (!featuredSectionToys || featuredSectionToys.length === 0) {
        return null;
    }

    return (
        <aside className='md:col-span-3 bg-white shadow-2xl rounded-xl p-6 h-fit sticky top-20'>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-4 pb-2 border-b">
                Special Items
            </h3>
            
            <div className="space-y-3">
                {featuredSectionToys.slice(0, 7).map(toy => (
                    <AsideCard key={toy.toyId} toy={toy} />
                ))}
            </div>
        </aside>
    );
};

export default AsideSection;