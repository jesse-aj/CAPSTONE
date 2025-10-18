import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-400 to-indigo-600 text-white">
      <h1 className="text-4xl font-bold mb-4">🌦️ Welcome to My Weather App</h1>
      <p className="text-lg mb-8">Get real-time weather updates and forecasts</p>
      <button
        onClick={() => navigate("/weather")}
        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 transition-all"
      >
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;