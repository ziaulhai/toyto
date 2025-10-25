import React, { useMemo } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { FaBook, FaCar, FaCube, FaPuzzlePiece, FaPaintBrush, FaDice, FaUser, FaBuilding, FaGamepad, FaRobot, FaWarehouse, FaBabyCarriage, FaTools, FaPlane } from 'react-icons/fa';


const getCategoryDisplayIcon = (categoryName) => {
    const name = categoryName?.toLowerCase().trim();
    switch (name) {
        case "games and puzzle":
        case "puzzles":
            return <FaPuzzlePiece className="text-4xl text-blue-500" />;
        case "indoor play":
        case "building blocks":
        case "wooden toys":
            return <FaBuilding className="text-4xl text-purple-500" />;
        case "kids books":
        case "educational toys":
        case "infant and toddler toys":
            return <FaBook className="text-4xl text-green-500" />;
        case "rockers & rides":
        case "remote control toys":
        case "die-cast vehicles":
            return <FaBabyCarriage className="text-4xl text-red-500" />;
        case "dolls":
        case "action figures":
        case "dolls and accessories":
            return <FaUser className="text-4xl text-pink-500" />;
        case "educational toy":
            return <FaTools className="text-4xl text-yellow-500" />;
        case "outdoor toy":
            return <FaPlane className="text-4xl text-orange-500" />;
        case "vehicles toys":
            return <FaCar className="text-4xl text-indigo-500" />;
        case "arts and crafts":
        case "sensory toys":
            return <FaPaintBrush className="text-4xl text-teal-500" />;
        case "board games":
        case "card games":
            return <FaDice className="text-4xl text-gray-500" />;
        case "robots":
            return <FaRobot className="text-4xl text-cyan-500" />;
        default:
            return <FaWarehouse className="text-4xl text-gray-400" />;
    }
};


const normalizeString = (str) => {
    if (!str) return '';
    return str.replace(/\s+/g, ' ').trim().toLowerCase();
};

const CategorySection = () => {
    const allToys = useLoaderData();

    const dynamicCategories = useMemo(() => {
        if (!allToys || allToys.length === 0) {
            console.log("DEBUGCATEGORY: AllToys data not loaded or empty.");
            return [];
        }

        const categoryMap = new Map();

        allToys.forEach(toy => {
            if (toy.Category) {
                const normalizedCategory = normalizeString(toy.Category);
                if (!categoryMap.has(normalizedCategory)) {
                    categoryMap.set(normalizedCategory, {
                        name: toy.Category.trim(),
                        count: 0,
                        pictureURL: toy.pictureURL || 'https://via.placeholder.com/100x100?text=Icon'
                    });
                }
                categoryMap.get(normalizedCategory).count++;
            }
        });

        const allDynamicCategories = Array.from(categoryMap.values()).map((catData, index) => {
            return {
                id: index + 1,
                name: catData.name,
                productCount: catData.count,
                icon: getCategoryDisplayIcon(catData.name)
            };
        });

        return allDynamicCategories.slice(0, 8);

    }, [allToys]);

    return (
        <div className="py-16 mt-10" style={{ backgroundColor: '#F7FCFE' }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        Shop By <span className="text-secondary">Featured Categories</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dynamicCategories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/all-toys?category=${encodeURIComponent(category.name.trim())}`}
                            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex items-center justify-between group cursor-pointer"
                        >
                            <div className="text-left">
                                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors duration-200">
                                    {category.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {category.productCount} Products
                                </p>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                                {category.icon}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategorySection;