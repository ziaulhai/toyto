import React from 'react'; 
import useDynamicTitle from '../hooks/useDynamicTitle';
import {useLoaderData,Link} from 'react-router-dom';
import HomeSlider from '../components/shared/HomeSlider'; 
import CategorySection from '../components/shared/CategorySection';
import AsideSection from '../components/shared/AsideSection'; 
import ToyCard from '../components/shared/ToyCard';


const Home = () => {
    useDynamicTitle("Home");
    
    const allToys = useLoaderData(); 
    
    const popularToys = allToys?.slice(0,8)||[];
    const featuredSectionToys = allToys?.slice(6,13)||[]; 

    return (
        <> 
            
            <HomeSlider/>

           
            <div className='mx-auto w-11/12 p-4'>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-16">
                    
                    
                    <div className='md:col-span-9 p-4'>
                        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 border-l-4 border-primary pl-4">Popular Toys</h2>
                        
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6'>
                            {popularToys.map(toy => (
                               
                                <ToyCard key={toy.toyId} toy={toy}/>
                            ))}
                        </div>

                        <div className="text-center mt-10">
                            <Link to="/all-toys" className="btn btn-primary btn-lg shadow-lg transform transition-transform duration-300 hover:scale-105">View All</Link>
                        </div>
                    </div>

                   
                    <AsideSection featuredSectionToys={featuredSectionToys} />
                </div>
                
               
                <CategorySection />
                
    
               
                <div className="mt-20">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-8 border-l-4 border-secondary pl-4">
                        Exclusive for ToyTopia Members
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                     
                        <div className="card shadow-xl bg-pink-100">
                            <div className="card-body">
                                <h3 className="card-title text-3xl text-pink-700">Educational Spotlight</h3>
                                <p>Explore STEM toys designed by educators to boost your child's learning curve while they play. Get 15% off all learning kits this week.</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-secondary text-white">View STEM Kits</button>
                                </div>
                            </div>
                        </div>

                        
                        <div className="card shadow-xl bg-blue-100">
                            <div className="card-body">
                                <h3 className="card-title text-3xl text-blue-700">Toy Safety Guide</h3>
                                <p>Read our comprehensive guide on age-appropriate toys and safety standards. Your child's well-being is our top priority.</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary text-white">Read Safety Tips</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </> 
    );
};

export default Home;