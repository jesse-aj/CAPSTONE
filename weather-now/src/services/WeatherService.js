import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// Function to fetch the data and info from the API 
export const fetchWeather = async (city) => {
    const response = await axios.get( "https://api.openweathermap.org/data/2.5/weather",{
        // THE UNIT SET TO METRICS GIVE THE DEGREEES IN CELCIUS AND Q TAKES THE DATA FRO CITIES AND APPID IS MY UNIQUE API KEY
        params:{ q:city, appid: API_KEY, units:"metric"},

    });

   // this simply returns the data
   return response.data;
};
 
export const fetchFosterCard = async(city) => {
    const response = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
        params:{ q:city, appid: API_KEY, units:"metric"},
    });

    return response.data;
};

