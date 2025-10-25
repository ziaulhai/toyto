import React from 'react';
import { FaBoxes, FaLeaf, FaSmile, FaTools } from 'react-icons/fa';
import useDynamicTitle from '../hooks/useDynamicTitle';

const About = () => {
    useDynamicTitle("About Us");

    return (
        <div className="min-h-[85vh] bg-gray-50 py-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-3">
                        About ToyTopia 🧸
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Your trusted source for the best and safest toys for every age.
                    </p>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-lg mb-12 border-t-4 border-secondary">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        Our Mission
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        ToyTopia was founded on the simple belief that play is essential for a child's development. Our mission is to curate a collection of toys that are not only fun and engaging but also prioritize safety, quality, and educational value. We strive to be the bridge between parents seeking the best for their children and the joy of imaginative play.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <div className="card bg-white shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                        <div className="card-body text-center">
                            <FaBoxes className="text-4xl text-primary mx-auto mb-3" />
                            <h3 className="card-title text-xl mx-auto text-gray-800">Uncompromising Quality</h3>
                            <p className="text-gray-600 text-sm">Every toy is rigorously inspected to meet international safety standards.</p>
                        </div>
                    </div>
                    <div className="card bg-white shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                        <div className="card-body text-center">
                            <FaTools className="text-4xl text-primary mx-auto mb-3" />
                            <h3 className="card-title text-xl mx-auto text-gray-800">Child-Safe Materials</h3>
                            <p className="text-gray-600 text-sm">We ensure all materials are non-toxic, durable, and environmentally friendly.</p>
                        </div>
                    </div>
                    <div className="card bg-white shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                        <div className="card-body text-center">
                            <FaLeaf className="text-4xl text-primary mx-auto mb-3" />
                            <h3 className="card-title text-xl mx-auto text-gray-800">Sustainable Choices</h3>
                            <p className="text-gray-600 text-sm">Promoting eco-friendly and sustainably sourced toys whenever possible.</p>
                        </div>
                    </div>
                    <div className="card bg-white shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                        <div className="card-body text-center">
                            <FaSmile className="text-4xl text-primary mx-auto mb-3" />
                            <h3 className="card-title text-xl mx-auto text-gray-800">Customer Happiness</h3>
                            <p className="text-gray-600 text-sm">Exceptional support to ensure smiles on both parents' and children's faces.</p>
                        </div>
                    </div>
                </div>

                <div className="text-center p-8 bg-base-100 rounded-xl shadow-inner">
                    <p className="text-xl font-semibold text-gray-700">
                        Join the ToyTopia Family Today!
                    </p>
                    <p className="text-gray-500 mt-2">
                        We're more than just a toy store; we're a community dedicated to joy and learning.
                    </p>
                    <a href="/all-toys" className="btn btn-primary mt-4 btn-wide">
                        Explore Our Toys
                    </a>
                </div>

            </div>
        </div>
    );
};

export default About;