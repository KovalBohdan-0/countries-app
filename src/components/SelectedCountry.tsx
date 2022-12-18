import { useNavigate, useParams } from "react-router-dom";
import backArrowIcon from "../assets/back-arrow-icon.svg";
import L from "leaflet";
import { useEffect } from "react";

export default function SelectedCountry(props: { countriesArray: any[]; }) {
    const { id } = useParams();
    const selectedCountry = props.countriesArray.find(country => country.cca3 == id);
    let currencies: string[] = [];
    let borderCountries: any[] = [];
    selectedCountry.borders && selectedCountry.borders.forEach((border: any) => {
        borderCountries.push(props.countriesArray.find(country => country.cca3 == border));
    });
    let navigate = useNavigate();

    if (!selectedCountry.currencies == null) {
        Object.keys(selectedCountry.currencies).forEach(currency => currencies.push(selectedCountry.currencies[`${currency}`].name));
    }

    //Adds map
    useEffect(() => {
        let map = L.map('map').setView(selectedCountry.latlng, 5);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        //Prevent scrolling to map element
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });

        return () => {
            const clear = async () => {
                map.remove();
            };

            clear();
        }
    });

    return (
        <div className="p-28 min-h-full h-fit bg-white dark:bg-gray-900 dark:text-white text-black">
            <button onClick={() => navigate(-1)} id="back" className="flex gap-3 w-fit px-6 py-2 rounded-md text-xl font-semibold dark:bg-slate-800 bg-slate-200">
                <img className="w-5" src={backArrowIcon} alt="" />Back
            </button>
            <div className="selected-country flex gap-32 my-16 flex-col md:flex-row">
                <img className="w-full h-1/5 md:w-2/5 aspect-video shadow-2xl" src={selectedCountry.flags.svg} />
                <div className="selected-country-info">
                    <p className="text-2xl font-extrabold">{selectedCountry.name.common}</p>
                    <div className="grid grid-cols-2 gap-x-16 gap-y-5 pt-5 pb-10">
                        {selectedCountry.name.nativeName ?
                            <p>
                                <span className="info-name">Native Name: </span>
                                <span className="info">{selectedCountry.name.nativeName[`${Object.keys(selectedCountry.name.nativeName)[0]}`].official}</span>
                            </p>
                            : null}
                        {selectedCountry.tld ?
                            <p>
                                <span className="info-name">Top Level Domain: </span>
                                <span className="info">{selectedCountry.tld.toString()}</span>
                            </p>
                            : null}
                        <p>
                            <span className="info-name">Population: </span>
                            <span className="info">
                                {selectedCountry.population.toLocaleString("en", {
                                    useGrouping: true,
                                })}
                            </span>
                        </p>
                        {selectedCountry.currencies ?
                            <p>
                                <span className="info-name">Currencies: </span>
                                <span className="info">{currencies.toString()}</span>
                            </p>
                            : null}
                        <p>
                            <span className="info-name">Region: </span>
                            <span className="info">{selectedCountry.region}</span>
                        </p>
                        {selectedCountry.languages ?
                            <p>
                                <span className="info-name">Languages: </span>
                                <span className="info">{Object.values(selectedCountry.languages).toString()}</span>
                            </p>
                            : null}
                        {selectedCountry.subregion ?
                            <p>
                                <span className="info-name">Sub Region: </span>
                                <span className="info">{selectedCountry.subregion}</span>
                            </p>
                            : null}
                        {selectedCountry.capital ?
                            <p>
                                <span className="info-name">Capital: </span>
                                <span className="info">{selectedCountry.capital}</span>
                            </p>
                            : null}
                    </div>
                    {borderCountries.length != 0 ?
                        <p>
                            <span>Border Countries: </span>
                            {borderCountries.map(borderCountry => {
                                return <button className="dark:bg-slate-800 bg-slate-200 inline-block rounded-md mx-1 my-2 p-2 shadow-2xl" onClick={() => navigate(`/country/${borderCountry.cca3}`)} key={borderCountry.ccn3}> {borderCountry.name.common}</button>
                            })}
                        </p>
                        : null
                    }
                </div>
            </div>
            <div id="map" className="h-96 mx-auto"></div>
        </div>
    );
}

