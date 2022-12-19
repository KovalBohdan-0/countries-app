import { Routes, Route, Navigate } from "react-router-dom";
import Countries from "./components/Countries";
import Navbar from "./components/Navbar";
import SelectedCountry from "./components/SelectedCountry";
import { useState, useEffect } from "react";
import NotFound from "./components/NotFound";

function App(props: any) {
  const [countriesArray, setCountriesArray] = useState([]);
  const localDarkMode = localStorage.getItem('darkMode') === 'false' ? false : true;
  const [darkMode, setDarkMode] = useState(localDarkMode);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(res => res.json())
      .then(json => setCountriesArray(json));
    setIsLoading(false);
  }, []);


  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      {isLoading ?
        <div className= "h-full flex justify-center items-center grow dark:bg-slate-900 bg-stone-300">
          <div className="lds-hourglass h-10 z-10"></div>
        </div>
      :
      <Routes>
        <Route path='*' element={<Navigate to="/notfound" replace />}/>
        <Route path='notfound' element={<NotFound />}/>
        <Route path="/" element={<Countries darkMode={darkMode} key={countriesArray} countriesArray={countriesArray} />} />
        <Route path="/country/:id" element={<SelectedCountry countriesArray={countriesArray} />} />
      </Routes> 
      }
    </div>
  )
}

export default App
