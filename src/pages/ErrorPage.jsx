import { useRouteError, Link } from "react-router-dom";
import useDynamicTitle from "../hooks/useDynamicTitle";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

const ErrorPage = () => {
    const error = useRouteError();
    useDynamicTitle("Error | Page Not Found");

    const status = error?.status || 404;
    const message = error?.statusText || "Oops! The page you are looking for doesn't exist.";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="text-center bg-white p-10 md:p-16 rounded-xl shadow-2xl max-w-lg">
                <FaExclamationTriangle className="w-20 h-20 text-error mx-auto mb-6 animate-pulse" />

                <h1 className="text-6xl font-extrabold text-primary mb-4">{status}</h1>

                <h2 className="text-3xl font-bold text-gray-800 mb-4">{message}</h2>

                <p className="text-gray-600 mb-8">
                    We couldn't find the requested resource. Please check the URL or return to the homepage.
                </p>

                <Link to="/">
                    <button className="btn btn-primary btn-lg mt-4 shadow-lg">
                        <FaHome /> Go Back
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;