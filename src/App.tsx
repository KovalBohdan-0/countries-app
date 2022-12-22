import { Routes, Route, Navigate } from "react-router-dom";
import Countries from "./components/Countries";
import Navbar from "./components/Navbar";
import SelectedCountry from "./components/SelectedCountry";
import { useState, useEffect } from "react";
import NotFound from "./components/NotFound";

export interface CountryType {
  name: {
    common: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      }
    }
  }
  tld?: string[];
  capital?: string[];
  region: string;
  subregion?: string;
  languages?: Object;
  borders?: string[];
  latlng: number[];
  population: number;
  flags: {
    svg: string;
  }
  cca2: string;
  ccn3: string;
  cca3: string;
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    }
  }
};


const App = (): JSX.Element => {
  //const dataArray = data;
  const [countriesArray, setCountriesArray] = useState<CountryType[]>(Object.create([] as unknown as CountryType[]));
  const localDarkMode = localStorage.getItem('darkMode') === 'false' ? false : true;
  const [darkMode, setDarkMode] = useState<boolean>(localDarkMode);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(res => res.json())
      .then(json => setCountriesArray(Array.from(json) as CountryType[]));
    setIsLoading(false);
  }, []);

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      {isLoading ?
        <div className="h-full flex justify-center items-center grow dark:bg-slate-900 bg-stone-300">
          <div className="lds-hourglass h-10 z-10"></div>
        </div>
        :
        <Routes>
          <Route path='*' element={<Navigate to="/notfound" replace />} />
          <Route path='notfound' element={<NotFound />} />
          <Route path="/" element={<Countries darkMode={darkMode} key={countriesArray[0] ? countriesArray[0].cca3 : ""} countriesArray={countriesArray} />} />
          <Route path="/country/:id" element={<SelectedCountry countriesArray={countriesArray} />} />
        </Routes>
      }
    </div>
  )
}

export default App
