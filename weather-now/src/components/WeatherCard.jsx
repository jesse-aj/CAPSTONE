const WeatherCard = ({ weather, units }) => {
  const tempUnit = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "m/s" : "mph";

  return (
    <div className="flex flex-col justify-left rounded-xl bg-black/20 p-6 text-white backdrop-blur-md dark:bg-black/30 w-full max-w-md mx-auto">


                     {/*  The City and Time */}
      <div>
        <h1 className="text-4xl font-bold">
          {weather.name}, {weather.sys.country}
        </h1>
        <p className="text-lg">
          {/* This displays the current date and time */}
          {new Date((weather.dt + weather.timezone) * 1000).toLocaleString("en-US", {
            weekday: "long",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {/* The  Main Weather Info */}
      <div className="text-right">
        <p className="text-6xl font-bold">
          {Math.round(weather.main.temp)}{tempUnit}
        </p>
        <p className="text-2xl font-medium capitalize">
          {weather.weather[0].description}
        </p>
        <p className="text-lg">
          Feels like {Math.round(weather.main.feels_like)}{tempUnit}
        </p>
      </div>

      {/* Weather Details */}

      {/* Humidity details */}
      <div className="grid grid-cols-2 gap-4 rounded-lg bg-black/20 p-4 text-sm backdrop-blur-sm dark:bg-black/30 mt-6">
        <div className="flex items-center gap-2">  
          Humidity: {weather.main.humidity}%
        </div>
             
             {/* Wind Speed  */}

        <div className="flex justify-end gap-2">
          Wind: {Math.round(weather.wind.speed)} {windUnit}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;