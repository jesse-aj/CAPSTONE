import { useState } from "react";
import { fetchFosterCard, fetchWeather } from "../services/WeatherService";
import ForcastCard from "./ForcastCard";
import { useEffect } from "react";
 
const Weather = () => {
const [city , setCity ] = useState("");
const [weather, setWeather ] = useState(null);
const [Forcast, setForcast] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [recentCities, setRecentCities] = useState([]);
const [uvIndex, setUVIndex] =useState(null);



// Load saved cities from localStorage when the app first runs
  useEffect(() => {
    const savedCities = JSON.parse(localStorage.getItem("recentCities")) || [];
    setRecentCities(savedCities);
  }, [])


// This will handle the search when a user searches for a city
const handleSearch = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setForcast([]);
    setWeather(null);
    setError("");

 



  try 
  {
    // This fetches the weather for the city and stores it in setWeather
    const data = await fetchWeather(city);
    setWeather(data);
   
    //This renders the UV index
     const { lat, lon } = weatherData.coord;
     const uv = await fetchUVIndex(lat, lon);
     setUVIndex(uv);


    // Now this fetches the 5 day forecast
    const forcastData = await fetchFosterCard(city);


// checks if dorecast if valid before using it

 if (forcastData && forcastData.list) {

    // this filters throught the data and fetch specific times
      const dailyData = forcastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      setForcast(dailyData);


      if(city) {

    //This allows the recent search to be on top and avoids duplicate and saves the last 5 searches
    const updatedCities = [city, ...recentCities.filter(c => c !== city)].slice(0, 5);
    setRecentCities(updatedCities);
    localStorage.setItem("recentCities", JSON.stringify(updatedCities));
  }


    } else {
        setError("Could not fetch forecast data.");  // this error will display if the forcast data couldnt be searched 
      }
    }

    
    
    catch (err) {
      console.error("Error fetching Data:", err);
      setError("City not found.");
    } 
    finally {
      setLoading(false); //This sets the loading to false to stop
    }
  };
    
  

return (
  <div>
    <h1>Weather Dashboard</h1>
  {/* //This is where the actual form logic is placed */}
  <input
     type="text"
     placeholder="Search for city or airport"
     value={city}
     // This triggers whenever the user types
     onChange = { (e) => setCity(e.target.value) } 

     //This add UI for which when a user clicks on enter
     onKeyDown={(e) => {
      if(e.key === "Enter") {
        handleSearch()
      }
     }}
     
     /> 
     
     {/* // this gives the app the typed text and it is saved in setCity */}
    

    <button onClick={handleSearch}>
    {loading ? "loading..." : "Search"}
      </button>
    

    {/* This displays the recent cities */}
      {recentCities.length > 0 && (
  <div>
    <h3>Recent Searches</h3>
    <div>
      {recentCities.map((cityName, index) => (
        <button
          key={index}
          onClick={() => {
            setCity(cityName);
            handleSearch(cityName); // call search directly when clicked
          }}
        >
          {cityName}
        </button>
      ))}
    </div>
  </div>
)}

<button
  onClick={() => {
    setRecentCities([]);
    localStorage.removeItem("recentCities");
  }}
  className="text-sm text-red-500 mt-2 hover:underline"
>
  Clear history
</button>
     
     {/* //This displays the error message */}
      {error && <p>{error}</p>}

       
      {/* // Now we show the results */}
      { weather && (
        <div>
        <h2>{weather.name}</h2>
        <h2>{weather.weather[0].description}</h2>
        <p>Feels like {Math.round(weather.main.temp)}°C</p>
        </div>
      ) }

 
{/* This Displays the the 5 day forcast */}
  { Forcast.length > 0 && (
    <div>
   {Forcast.map ((item, index) => (
    <ForcastCard 
    key={index}
    day={new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "long" })} //This changes the array string to a single day
    temp={Math.round(item.main.temp)} // It converts the values from decimal to actual numbers
    desc={item.weather[0].description} // This gets the main weather condition 
    />
   ))}
    </div>
  )}
   </div>
);
};


export default Weather;