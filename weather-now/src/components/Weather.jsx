import { useState, useEffect } from "react";
import { fetchFosterCard, fetchWeather } from "../services/WeatherService";
import ForcastCard from "./ForcastCard";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import ErrorMessage from "./ErrorMessages";
import ThemeToggle from "./ThemeToggle";



//  This code takes and holds all data that are to be displayed
const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [Forcast, setForcast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentCities, setRecentCities] = useState([]);
  const [units, SetUnits] = useState("metric");

  //This handles the toggle 

  const handleUnitToggle = () => {
  SetUnits(prev => (prev === "metric" ? "imperial" : "metric"));
};

  //This renders when the app starts 

  useEffect (() => {
    const loadDefaultWeather = async () => {
        try {
            const data = await fetchWeather("Accra, units");   // This is the default location and applies to the unit selected
            setWeather(data);

                 //This also shows the 5 day forcaste of the default weather which is Accra
             const forcastData = await fetchFosterCard("Accra, units");
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
}, [city, units]);


   //This allows recent cities to show when the app starts

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
      const Weatherdata = await fetchWeather(city, units);
      setWeather(Weatherdata);
             

           // This also fetches for the 5day forcast and stores it in setForcast, it also filters to makes it return a weather for a day at 12 not the default 3hours
      const forcastData = await fetchFosterCard(city, units);
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
    //This stops loading from running

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
       <div className="bg-white text-black dark:bg-gray-900 dark:text-white p-4">

      <h1 className="text-5xl font-extrabold text-center text-blue-600 dark:text-blue-400 drop-shadow-lg tracking-wide">Weather Now</h1>

     


             {/* This button allows users to switch between Fahrenheit and Celcius */}
               <div className="flex justify-end items-center gap-4 p-4">
            <button
             onClick={handleUnitToggle}
             className="bg-blue-500 text-white px-4 py-2 rounded-xl"
             > 
                Switch to {units === "metric" ? "°F" : "°C"}
                 </button> 
                      
                       {/* This displays the theme Toggle */}

                          <ThemeToggle/>

                 </div>

         <div className="flex flex-col items-center">
  <button
    onClick={handleRefresh}
    className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 relative -top-2"
  >
    REFRESH
  </button>
</div>

           {/* Renders the loading */}
      {loading && <p>Loading...</p>}
      {!loading && <ErrorMessage message={error} />}

               {/* This displays the main weather*/}
               <div className="flex justify-between items-start w-screen h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
                    <div className="flex-1 p-10">
      {weather && <WeatherCard weather={weather} units={units}/>}
      {/* Button for Refresh */}
                    </div>
                                

               <div className=" w-[380px] h-full bg-white/60 dark:bg-white/10 backdrop-blur-2xl shadow-xl border-l border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">

               {/* This manages and display user input and search logic through these props. */}
      <SearchBar
        city={city}
        setCity={setCity}
        handleSearch={handleSearch}
        recentCities={recentCities}
        setRecentCities={setRecentCities}
      />

                    
                {/* This displays the 5day forcast weather  and maps through it*/}
     {Forcast.length > 0 && (
  <div className="bg-white/70 dark:bg-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-lg w-full max-w-sm">
    <h2 className="text-gray-800 dark:text-gray-100 font-semibold text-lg mb-4">
      5-Day Forecast
    </h2>


    <div className="space-y-5">
      {Forcast.map((item, index) => (
        <ForcastCard
          key={index}    
          day={new Date(item.dt_txt).toLocaleDateString("en-US", {weekday: "long",
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
     </div>
     
   </div>
   </div>

  );
};

export default Weather;
