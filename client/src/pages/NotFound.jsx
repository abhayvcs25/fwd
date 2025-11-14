import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center text-center px-4">
      
      <h1 className="text-7xl font-extrabold text-black">404</h1>
      
      <p className="text-lg text-gray-600 mt-3">
        The page you are looking for does not exist.
      </p>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
      >
        ⬅ Back
      </button>
    </div>
  );
}
