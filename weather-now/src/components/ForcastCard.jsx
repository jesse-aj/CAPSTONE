const ForecastCard = ({ day, temp, desc, units }) => {
  return (
    <div className="flex items-center justify-between rounded-lg p-3 bg-[#359EFF]/10 dark:bg-[#359EFF]/20 hover:bg-[#359EFF]/20 dark:hover:bg-[#359EFF]/30 transition-colors">
      <p className="font-medium text-slate-800 dark:text-slate-200">{day}</p>
      <p className="text-sm text-slate-600 dark:text-slate-400 capitalize flex-1 text-center">
        {desc}
      </p>
      <p className="text-slate-600 dark:text-slate-400 font-semibold">
        {temp}°{units === "metric" ? "C" : "F"}
      </p>
    </div>
  );
};

export default ForecastCard;
