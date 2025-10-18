

import Weather from "./components/Weather";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";



const App= () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<LandingPage/>} />
        <Route path= "/weather" element = {<Weather/>} />


  </Routes>
  </Router>
  );
};

export default App;