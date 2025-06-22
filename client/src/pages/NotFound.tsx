
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white px-6 text-center">
      <h1 className="text-[120px] font-extrabold leading-none tracking-tight  text-white">
        404
      </h1>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-400 max-w-xl mb-8">
        Sorry, the page you’re looking for doesn’t exist or has been moved. Try checking the URL or return to the homepage.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 bg-white text-black font-medium px-5 py-2 rounded hover:bg-gray-200 transition-all"
      >
        <ArrowLeft size={16} /> Go Back Home
      </Link>

  
    </div>
  );
}
