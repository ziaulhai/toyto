import useDynamicTitle from "../hooks/useDynamicTitle"; 
import { FaHeadset } from 'react-icons/fa';

const ExtraPage = () => {
    useDynamicTitle("Support Center"); 

    return (
        <div className="container mx-auto p-8 min-h-[70vh]">
            <div className="text-center my-12 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-lg shadow-xl">
                <FaHeadset className="text-6xl text-blue-600 mx-auto mb-4" />
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                    ToyTopia Support Center 🛠️
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                    As a valued logged-in member, here you can access advanced support and exclusive resources.
                </p>
                <div className="space-y-4 max-w-lg mx-auto">
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <h2 className="font-semibold text-lg text-blue-800">Exclusive Guides</h2>
                        <p className="text-sm text-gray-500">Access to premium troubleshooting and toy care guides.</p>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <h2 className="font-semibold text-lg text-blue-800">Priority Chat</h2>
                        <p className="text-sm text-gray-500">Live chat support with dedicated agents for faster help.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExtraPage;