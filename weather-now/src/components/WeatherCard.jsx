const WeatherCard = ({ weather, units }) => {
  const tempUnit = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "m/s" : "mph";

  return (
    <div className="flex justify-between flex-col  rounded-3xl bg-white/40 dark:bg-black/30 backdrop-blur-xl shadow-2xl p-10 w-full max-w-10xl min-h-[750px] ml-0 text-gray-900 dark:text-white transition-all duration-500">


      {/* City and Time  of Location*/}
      <div>
        <h1 className="text-5xl font-bold mb-2">
          {weather.name}, {weather.sys.country}
        </h1>
        {/* This displays the time and date */}
        <p className="text-xl text-gray-700 dark:text-gray-300">
          {new Date((weather.dt + weather.timezone) * 1000).toLocaleString("en-US", {
            weekday: "long",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {/* Main Weather Information and Data */}
      <div className="text-right">
        <p className="text-[150px] font-extrabold leading-none">
          {Math.round(weather.main.temp)}{tempUnit}
        </p>

        <p className="text-3xl font-medium capitalize">
          {weather.weather[0].description}
        </p>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-12">
          Feels like {Math.round(weather.main.feels_like)}{tempUnit}
        </p>
      </div>

      {/* This Displays the wind and Humidity*/}
      <div className="flex justify-between items-center rounded-2xl bg-black/20 dark:bg-white/10 p-6 mt-6 text-base backdrop-blur-md">
        <div className="flex items-center gap-2">
          Humidity: {weather.main.humidity}%
        </div>


        <div className="flex items-center gap-2">
          Wind: {Math.round(weather.wind.speed)} {windUnit}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
