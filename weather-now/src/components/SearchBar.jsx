const SearchBar = ({
  city,
  setCity,
  handleSearch,
  recentCities,
  setRecentCities,
}) => {
  return (
    <div className="mb-6">
      <div className="relative mb-4">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">
          search
        </span>
        <input
          type="text"
          placeholder="Search for a city or airport"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full rounded-lg border border-[#359EFF]/20 dark:border-[#359EFF]/30 bg-transparent py-2 pl-10 pr-4 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#359EFF] dark:text-white dark:placeholder:text-slate-400"
        />
      </div>

      {/* Recent searches */}
      {recentCities.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Recent Searches
            </h2>
            <button
              onClick={() => {
                setRecentCities([]);
                localStorage.removeItem("recentCities");
              }}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              Clear
            </button>
          </div>
          <div className="space-y-2">
            {recentCities.map((cityName, index) => (
              <button
                key={index}
                onClick={() => {
                  setCity(cityName);
                  handleSearch(cityName);
                }}
                className="w-full flex items-center justify-between rounded-lg p-3 bg-[#359EFF]/10 dark:bg-[#359EFF]/20 hover:bg-[#359EFF]/20 dark:hover:bg-[#359EFF]/30 transition-colors text-left"
              >
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {cityName}
                </span>
                <span className="material-symbols-outlined text-[#359EFF] text-sm">
                  arrow_forward
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
