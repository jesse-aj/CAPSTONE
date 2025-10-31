

const SearchBar = ({ city, setCity, handleSearch, recentCities, setRecentCities }) => { //This a props taken from Weather
  return (
    <div>


      <input
        type="text"
        placeholder="Search for city or airport"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" 
        && handleSearch()}
        className="border p-2 rounded w-full"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Search
      </button>
      

      {/* Recent searches */}
      {recentCities.length > 0 && (
        <div className="mt-3">
          <h3 className="font-semibold">Recent Searches</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {recentCities.map((cityName, index) => (
              <button
                key={index}
                onClick={() => {
                  setCity(cityName);
                  handleSearch(cityName);
                }}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                {cityName}
              </button>
            ))}
          </div>

          {/* Clears history of recent Searches */}
          <button className="hover:underline"
            onClick={() => {
              setRecentCities([]);
              localStorage.removeItem("recentCities");
            }}>
            Clear history
          </button>

        </div>
      )}
    </div>
  );
};

export default SearchBar;
