import axios from "axios";

const API_KEY = "32509d2f0044f8f52f36c5d8deb47cc7";

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

export const fetchUVIndex = async (lat, lon) => {
  try {
    const response = await axios.get("https://api.openweathermap.org/data/2.5/onecall", {
      params: {
        lat,
        lon,
        exclude: "minutely,hourly,daily,alerts",
        appid: API_KEY,
        units: "metric",
      },
    });
    const uvi = response.data && response.data.current && response.data.current.uvi;
    return typeof uvi === "number" ? uvi : null;
  } catch (err) {
    console.error("Error fetching UV index:", err);
    return null;
  }
};



