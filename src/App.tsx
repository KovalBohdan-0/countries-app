import { Routes, Route } from "react-router-dom";
import Countries from "./components/Countries";
import Navbar from "./components/Navbar";
import SelectedCountry from "./components/SelectedCountry";
import { useState, useEffect } from "react";

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
      {!isLoading ?
      <Routes>
        <Route path="/" element={<Countries darkMode={darkMode} key={countriesArray} countriesArray={countriesArray} />} />
        <Route path="/country/:id" element={<SelectedCountry countriesArray={countriesArray} />} />
      </Routes> 
      : null}
    </div>
  )
}

export default App
