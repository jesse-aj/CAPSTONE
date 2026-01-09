import { useState, useEffect } from "react";
import { fetchFosterCard, fetchWeather } from "../services/WeatherService";
import ForecastCard from "./ForcastCard";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import ErrorMessage from "./ErrorMessages";
import ThemeToggle from "./ThemeToggle";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [Forcast, setForcast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentCities, setRecentCities] = useState([]);
  const [units, SetUnits] = useState("metric");

  const handleUnitToggle = () => {
    SetUnits((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  useEffect(() => {
    const loadDefaultWeather = async () => {
      try {
        const data = await fetchWeather("Accra", units);
        setWeather(data);

        const forcastData = await fetchFosterCard("Accra", units);
        if (forcastData && forcastData.list) {
          const dailyData = forcastData.list.filter((item) =>
            item.dt_txt.includes("12:00:00")
          );
          setForcast(dailyData);
        } else {
          setError("Could not fetch forecast data.");
        }
      } catch (err) {
        console.error("Error fetching default data:", err);
        setError("Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };

    loadDefaultWeather();
  }, [units]);

  useEffect(() => {
    const savedCities = JSON.parse(localStorage.getItem("recentCities")) || [];
    setRecentCities(savedCities);
  }, []);

  const handleSearch = async (searchCity) => {
    const query = (searchCity ?? city).trim();
    if (!query) return;
    setLoading(true);
    setError("");
    setWeather(null);
    setForcast([]);

    try {
      const Weatherdata = await fetchWeather(query, units);
      setWeather(Weatherdata);

      const forcastData = await fetchFosterCard(query, units);
      if (forcastData && forcastData.list) {
        const dailyData = forcastData.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );
        setForcast(dailyData);

        const updatedCities = [
          query,
          ...recentCities.filter((c) => c !== query),
        ].slice(0, 5);
        setRecentCities(updatedCities);
        localStorage.setItem("recentCities", JSON.stringify(updatedCities));
      } else {
        setError("Could not fetch forecast data.");
      }
    } catch (err) {
      console.error("Error fetching Data:", err);
      setError("City not found.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    setError("");
    try {
      const currentCity = weather?.name || "Accra";
      const data = await fetchWeather(currentCity, units);
      const forcastData = await fetchFosterCard(currentCity, units);

      setWeather(data);

      if (forcastData && forcastData.list) {
        const dailyData = forcastData.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );
        setForcast(dailyData);
      }
    } catch (err) {
      console.error("Refresh error:", err);
      setError("Failed to refresh weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f7f8] dark:bg-[#0f1923]">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#359EFF]/20 dark:border-[#359EFF]/30 px-4 sm:px-6 lg:px-10 py-4">
        <div className="flex items-center gap-3 text-slate-800 dark:text-white">
          <svg
            className="h-8 w-8 text-[#359EFF]"
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"
              fill="currentColor"
            ></path>
            <path
              clipRule="evenodd"
              d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z"
              fill="currentColor"
              fillRule="evenodd"
            ></path>
          </svg>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            WeatherNow
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleUnitToggle}
            className="flex h-10 items-center justify-center rounded-lg bg-[#359EFF]/10 px-4 text-sm font-bold text-[#359EFF] dark:bg-[#359EFF]/20 hover:bg-[#359EFF]/20 dark:hover:bg-[#359EFF]/30 transition-colors"
          >
            <span>°C / °F</span>
          </button>
          <ThemeToggle />
          <button
            onClick={handleRefresh}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#359EFF]/10 text-[#359EFF] dark:bg-[#359EFF]/20 hover:bg-[#359EFF]/20 dark:hover:bg-[#359EFF]/30 transition-colors"
            title="Refresh"
          >
            <span className="material-symbols-outlined">refresh</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        {/* Weather Display */}
        <div
          className="flex-1 bg-cover bg-center p-4 sm:p-6 lg:p-8 min-h-[400px] lg:min-h-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1200&auto=format&fit=crop')",
          }}
        >
          {loading && (
            <div className="flex items-center justify-center h-full">
              <p className="text-white text-xl font-semibold">Loading...</p>
            </div>
          )}
          {!loading && error && <ErrorMessage message={error} />}
          {!loading && weather && (
            <WeatherCard weather={weather} units={units} />
          )}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-96 shrink-0 border-t lg:border-t-0 lg:border-l border-[#359EFF]/20 dark:border-[#359EFF]/30 p-4 sm:p-6 overflow-y-auto">
          <SearchBar
            city={city}
            setCity={setCity}
            handleSearch={handleSearch}
            recentCities={recentCities}
            setRecentCities={setRecentCities}
          />

          {/* 5-Day Forecast */}
          {Forcast.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                5-Day Forecast
              </h2>
              <div className="space-y-3">
                {Forcast.map((item, index) => (
                  <ForecastCard
                    key={index}
                    day={new Date(item.dt_txt).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                    temp={Math.round(item.main.temp)}
                    desc={item.weather[0].description}
                    units={units}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#359EFF]/20 dark:border-[#359EFF]/30 p-4 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Powered by OpenWeatherMap
        </p>
      </footer>
    </div>
  );
};

export default Weather;
