import { useEffect, useState } from "react";
import Country from "./Country";
import Select from 'react-select';
import Search from "./Search";
import { CountryType } from "../App";

export interface Region {
    value: string;
    label: string;
}

const Countries = (props: { darkMode: boolean, countriesArray: CountryType[] }): JSX.Element => {


    const [countriesArray, setCountriesArray] = useState(() => {
        let sortedCountries: CountryType[] = Array.from(props.countriesArray);
        sortedCountries.sort((firstCountry, secondCountry) => {

            return firstCountry.name.common.toLowerCase().localeCompare(secondCountry.name.common.toLowerCase());
        });

        return sortedCountries;
    });


    const [selectedRegion, setSelectedRegion] = useState<any>({ value: "all", label: 'All regions' });
    const regions: Region[] = [
        { value: "all", label: 'All regions' },
        { value: 'Africa', label: 'Africa' },
        { value: 'Americas', label: 'America' },
        { value: 'Asia', label: 'Asia' },
        { value: 'Europe', label: 'Europe' },
        { value: 'Oceania', label: 'Oceania' }
    ];

    useEffect(() => {
        if (selectedRegion.value != "all") {
            setCountriesArray(() => {
                let sortedArray: CountryType[] = props.countriesArray.filter((regionCountry) => regionCountry.region == selectedRegion.value);
                sortedArray.sort((firstCountry, secondCountry) => {

                    return firstCountry.name.common.toLowerCase().localeCompare(secondCountry.name.common.toLowerCase());
                });

                return sortedArray;
            });
        } else {
            setCountriesArray(() => {
                let sortedCountries: CountryType[] = Array.from(props.countriesArray);
                sortedCountries.sort((firstCountry, secondCountry) => {

                    return firstCountry.name.common.toLowerCase().localeCompare(secondCountry.name.common.toLowerCase());
                });

                return sortedCountries;
            });
        }
    }, [selectedRegion]);

    useEffect(() => {

    }, [countriesArray]);

    const selectStyles = props.darkMode ? {
        control: (styles: any) => ({
            ...styles,
            backgroundColor: "rgb(30, 41, 59)",
            color: "white",
            border: "solid 0.05rem black",
            height: "3.5rem",
        }),
        option: (base: any, state: { isSelected: boolean; isFocused: boolean }) => ({
            ...base,
            backgroundColor: state.isSelected ? "rgb(102, 68, 252)" : state.isFocused ? "rgba(102, 68, 252, 0.2)" : "rgb(30, 41, 59)",
            color: "white",
        }),
        menu: (styles: any) => ({
            ...styles,
            backgroundColor: "rgb(30, 41, 59)",
            borderRadius: "0.5rem",
            border: "rgb(17, 24, 39) solid 0.2rem"
        }),
        menuList: (styles: any) => ({
            ...styles,
            borderRadius: "0.7rem",
        }),
        singleValue: (styles: any) => ({
            ...styles,
            color: "white",
        }),
        input: (styles: any) => ({
            ...styles,
            color: "white",
        }),
    } : {
        option: (base: any, state: { isSelected: any; }) => ({
            ...base,
            color: "black",
        }),
        control: (styles: any) => ({
            ...styles,
            height: "3.5rem",
        }),
    }

    console.log(selectedRegion);

    return (
        <div className="bg-stone-300 dark:bg-gray-900 pt-28 px-10 min-h-screen">
            <div className="w-full mb-10 flex sm:flex-row flex-col">
                <Search
                    setCountriesArray={setCountriesArray}
                    countriesArray={countriesArray}
                    selectedRegion={selectedRegion}
                />
                <Select
                    className="z-0 sm:ml-auto mx-auto sm:w-40 w-full text-white"
                    styles={selectStyles}
                    value={selectedRegion}
                    onChange={setSelectedRegion}
                    options={regions}
                />
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-16">
                {countriesArray.map((country: CountryType) => (
                    <Country key={country.cca3} countryData={country} />
                ))}
            </div>
        </div>
    );
}

export default Countries;