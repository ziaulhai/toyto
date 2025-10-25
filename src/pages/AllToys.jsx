import React, { useMemo } from 'react';
import { useLoaderData, Link, useSearchParams } from 'react-router-dom';
import useDynamicTitle from '../hooks/useDynamicTitle';
import { FaDollarSign, FaStar } from 'react-icons/fa';

const ToyCard = ({ toy }) => (
    <div className="card bg-base-100 shadow-xl transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] w-[270px] h-[400px] mx-auto flex flex-col overflow-hidden">
        
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
                    <span className="flex items-center text-yellow-500">
                        <FaStar className='mr-1' />{toy.rating}
                    </span>
                    <span className="text-gray-600 text-sm">
                        Stock:{toy.availableQuantity}
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

const AllToys = () => {
    useDynamicTitle("All Toys");
    const allToys = useLoaderData();
    
    const [searchParams] = useSearchParams();
    const categoryFromURL = searchParams.get('category');

    const filteredToys = useMemo(() => {
        if (!categoryFromURL) {
            return allToys;
        }
        
        const normalizedCategory = categoryFromURL
            .replace(/\s/g, ' ')
            .trim()
            .toLowerCase();

        const result = allToys.filter(toy => {
            if (!toy.Category) {
                return false;
            }

            const toyCategory = toy.Category
                .replace(/\s/g, ' ')
                .trim()
                .toLowerCase();

            const isMatch = toyCategory === normalizedCategory;

            return isMatch;
        });
        
        console.log(`3. Filtered Toys Count for '${categoryFromURL}': ${result.length}`);
        
        return result;
    }, [allToys, categoryFromURL]);
    
    const pageTitle = categoryFromURL ? `${categoryFromURL} Collection` : "Our Collections";
    
    useDynamicTitle(pageTitle);

    return (
        <div className="container mx-auto p-4 md:p-8 min-h-screen w-11/12">
            <h1 className="text-4xl font-extrabold text-center text-primary mb-10 border-b pb-4">
                {pageTitle}
            </h1>

            {filteredToys.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                    {filteredToys.map(toy => (
                        <ToyCard key={toy.toyId} toy={toy} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-2xl text-gray-500">
                        {categoryFromURL ? `No toys found in the '${categoryFromURL}' category.` : "No toys found in the collection."}
                    </p>
                </div>
            )}
        </div>
    );
};

export default AllToys;