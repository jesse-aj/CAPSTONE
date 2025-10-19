import { useEffect, useState } from "react";
  // this is a function that handles dark themes
const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );


//THis allows it to show on app starts
useEffect( () => {
    if(darkMode) {
        document.documentElement.classList.add("dark") ;
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light")
    }

}, [darkMode]

);


return (
    <div className="flex justify-end p-4">
    <button 
    onClick={()=> setDarkMode(!darkMode)}
    className="p-2 rounded-2xl bg-gray-300 dark:bg-gray-700 text-black dark:text-white">
        {darkMode ? " Light Mode" : " Dark Mode"}

    </button>
  </div>


);

};


export default ThemeToggle;