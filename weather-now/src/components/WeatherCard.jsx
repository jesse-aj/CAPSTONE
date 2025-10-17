

const WeatherCard = ({ weather, units}) => {

  return (
    <div>
      <h2>
        {/* This displays the weather name*/}
        {weather.name}, {weather.sys.country}    
      </h2>
    {/* This displays the Date and time of the specific location */}
      <p>
        {new Date((weather.dt + weather.timezone) * 1000).toLocaleString("en-US", {
          weekday: "long",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      <div>
        <div>
          <p>Temp</p>
          <p>Feels like {Math.round(weather.main.temp)}°{units === "metric" ? "C" : "F"}</p>
        </div>
        <div>
          <p> Humidity</p>
          <p>{weather.main.humidity}%</p>
        </div>
        <div>
          <p> Wind</p>
          <p>{Math.round(weather.wind.speed)}{units ==="metric" ? "m/s" : "mph"}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
