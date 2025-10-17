export default function ForcastCard ({day, temp, desc, units }) {
    return(
        <div>
        <p>{day}</p>
        <p>{temp}°{units === "metric" ? "C" : "F"}</p>
        <p>{desc}</p>





        </div>
    );

    
}