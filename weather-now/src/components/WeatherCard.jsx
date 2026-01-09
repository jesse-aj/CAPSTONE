const WeatherCard = ({ weather, units }) => {
  const tempUnit = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "m/s" : "mph";

  return (
    <div className="flex h-full flex-col justify-between rounded-xl bg-black/20 dark:bg-black/30 p-6 lg:p-8 text-white backdrop-blur-md">
      <div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
          {weather.name}, {weather.sys.country}
        </h1>
        <p className="text-base sm:text-lg text-white/80">
          {new Date((weather.dt + weather.timezone) * 1000).toLocaleString(
            "en-US",
            {
              weekday: "long",
              hour: "2-digit",
              minute: "2-digit",
            }
          )}
        </p>
      </div>

      <div className="text-right my-8">
        <p className="text-7xl sm:text-8xl lg:text-9xl font-bold leading-none">
          {Math.round(weather.main.temp)}°
        </p>
        <p className="text-xl sm:text-2xl font-medium capitalize mt-2">
          {weather.weather[0].description}
        </p>
        <p className="text-base sm:text-lg text-white/80 mt-1">
          Feels like {Math.round(weather.main.feels_like)}
          {tempUnit}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 rounded-lg bg-black/20 dark:bg-black/30 p-4 text-sm backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">water_drop</span>
          Humidity: {weather.main.humidity}%
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">air</span>
          Wind: {Math.round(weather.wind.speed)} {windUnit}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
