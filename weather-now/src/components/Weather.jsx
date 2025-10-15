import { useState } from "react";
import { fetchWeather } from "../services/WeatherService";
 
const Weather = () => {
const [city , setCity ] = useState("");
const [weather, setWeather ] = useState(null);

// This will handle the search when a user searches for a city
const handleSearch = async () => {
    if (!city.trim()) {
        alert("Please enter city name");
        return;
    }
  try 
  {

    const data = await fetchWeather(city);
    setWeather(data);
  } catch {
    alert("Can't find city,please try again ⚠️")
  }
};



return (
  <div>
    <h1>Weather Dashboard</h1>
  {/* //This is where the actual form logic is placed */}
  <input
     type="text"
     placeholder="Enter City"
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
    

     <button onClick={handleSearch}> Search</button>
       
      {/* // Now we show the results */}
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


export default Weather;