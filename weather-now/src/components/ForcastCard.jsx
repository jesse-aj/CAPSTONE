export default function ForecastCard({ day, temp, desc, units }) {
  return (
    //  mini-cards for each forecast day 
    <div className="flex items-center justify-between bg-blue-50/70 dark:bg-white/10 
                    px-4 py-3 rounded-xl hover:bg-blue-100/70 dark:hover:bg-white/20 
                    transition-all shadow-sm">


      {/*  Day and Description */}
      <div className="flex flex-col">
        <p className="text-gray-800 dark:text-gray-100 font-medium">{day}</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm capitalize">{desc}</p>
      </div>

      {/* Temperature  and handles change*/}
      <p className="text-gray-900 dark:text-gray-100 font-semibold text-lg">
        {temp}°{units === "metric" ? "C" : "F"}
      </p>
    </div>
  );
}