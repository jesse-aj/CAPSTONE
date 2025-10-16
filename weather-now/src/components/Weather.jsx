import { useState, useEffect } from "react";
import { fetchFosterCard, fetchWeather } from "../services/WeatherService";
import ForcastCard from "./ForcastCard";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import ErrorMessage from "./ErrorMessages";



//  This code takes and holds all data that are to be displayed
const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [Forcast, setForcast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentCities, setRecentCities] = useState([]);

  //This renders when the app starts 

  useEffect (() => {
    const loadDefaultWeather = async () => {
        try {
            const data = await fetchWeather("Takoradze");   // This is the default location 
            setWeather(data);

                 //This also shows the 5 day forcaste of the defaukt weather
             const forcastData = await fetchFosterCard(defaultCity);
            if (forcastData && forcastData.list) {
            const dailyData = forcastData.list.filter((item) =>
           item.dt_txt.includes("12:00:00")
                );
           setForcast(dailyData);
            } else {
           setError("Could not fetch forecast data.");
           }

               //Handles errror when fetching for deafult weather
        } catch (err) {
            console.error("Error fetching default data:", err);
            setError("Failed to fetch weather data ");

        } finally {
            setLoading(false);
        }
 
  };

  loadDefaultWeather();
}, []);


   //This allows recent cities to render when the app starts

  useEffect(() => {
    const savedCities = JSON.parse(localStorage.getItem("recentCities")) || [];
    setRecentCities(savedCities);
  }, []);

   //This handles the Search bar(what hapeens when the user clicks on search)
  const handleSearch = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    setWeather(null);
    setForcast([]);


              // This fetches the weather info from the API and stores it setWeather
    try {
      const Weatherdata = await fetchWeather(city);
      setWeather(Weatherdata);
             

           // This also fetches for the 5day forcast and stores it in setForcast, it also filters to makes it return a weather for a day at 12 not the default 3hours
      const forcastData = await fetchFosterCard(city);
      if (forcastData && forcastData.list) {
        const dailyData = forcastData.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );
        setForcast(dailyData);

        //This also handles the recent cities or searches(avoids duplicates and trim the to only 5)

        const updatedCities = [city, ...recentCities.filter((c) => c !== city)].slice(0, 5);
        setRecentCities(updatedCities);
        localStorage.setItem("recentCities", JSON.stringify(updatedCities));
      }  
      // This finally handles error when forecast couldnt be searched
      else {
        setError("Could not fetch forecast data.");
      }
    } catch (err) {
      console.error("Error fetching Data:", err);
      setError("City not found.");
    } 
    //This stops loading from runnin

    finally {
      setLoading(false);
    }
  };


  // This will handle the refresh button for both forcast and deafault Weather
const handleRefresh = async () => {
  setLoading(true);
  setError("");
  try {
    const currentCity = weather?.name || "Takoradi";
    const data = await fetchWeather(currentCity);
    const forcastData = await fetchFosterCard(currentCity);

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
    <div>
      <h1>Weather Dashboard</h1>
   {/* This manages and display user input and search logic through these props. */}
      <SearchBar
        city={city}
        setCity={setCity}
        handleSearch={handleSearch}
        recentCities={recentCities}
        setRecentCities={setRecentCities}
      />
           {/* Renders the loading */}
      {loading && <p>Loading...</p>}
      {!loading && <ErrorMessage message={error} />}

               {/* This displays the main weather*/}
      {weather && <WeatherCard weather={weather} />}

      {/* Button for Refresh */}

      <button
              onClick={handleRefresh}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                   >
                 Refresh
             </button>
                    
                {/* This displays the 5day forcast weather */}
      {Forcast.length > 0 && (
        <div>
          {Forcast.map((item, index) => (
            <ForcastCard
              key={index}
              day={new Date(item.dt_txt).toLocaleDateString("en-US", {
                weekday: "long",
              })}
              temp={Math.round(item.main.temp)}
              desc={item.weather[0].description}
            />
          ))}

        </div>

      )}
    </div>

  );
};

export default Weather;
