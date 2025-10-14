import { useState } from "react";
import { fetchWeather } from "./services/WeatherService";
 
export default function App() {
const [city , setCity ] = ("");
const [weather, setWeather ] = (null);

// This will handle the search when a user searches for a city
const handleSearch = async () => {
  try 
  {

    const data = await fetchWeather(city);
    setWeather(data);
  } catch {
    alert("City not found")
  }
};

return (
  <div>
    <h1>Weather Dashboard</h1>
  //This is where the actual form logic is placed
  <input
     type="text"
     placeholder="Enter City"
     value={city}
     // This triggers whenever the user types
     onChange = { (e) => setCity(e.target.value) } />// this gives the app the typed text and it is saved in setCity
    

     <button onClick={handleSearch}> Search</button>
       
      // Now we show the results
      { weather && (
        <div>
        <h2>{weather.name}</h2>
        <h2>{weather.weather[0].description}</h2>
        <p>{weather.main.temp}°C</p>
        </div>
      ) }

  </div>
);
}


