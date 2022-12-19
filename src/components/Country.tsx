import { Link, useNavigate } from "react-router-dom";

export default function Country(props: any) {
    let navigate = useNavigate();

    return (
        <button className="w-full" onClick={() => navigate(`/country/${props.countryData.cca3}`)}>
            <div className="country rounded-md w-full text-left">
                <img
                    src={props.countryData.flags.svg}
                    className="country__image w-full aspect-video"
                    alt="Flag of country"
                />
                <div className="country__description w-full bg-white dark:bg-slate-800 p-5 font-semibold dark:text-slate-200 text-black">
                    <p className="font-extrabold">{props.countryData.name.common}</p>
                    <p>
                        <span className="description-text">Population: </span>
                        <span className="country-data">{props.countryData.population.toLocaleString("en", {
                            useGrouping: true,
                        })}
                        </span>
                    </p>
                    <p>
                        <span className="description-text">Region: </span>
                        <span className="country-data">{props.countryData.region}</span>
                    </p>
                    {props.countryData.capital ?
                        <p>
                            <span className="description-text">Capital: </span>
                            <span className="country-data">{props.countryData.capital}</span>
                        </p>
                        : null}
                </div>
            </div>
        </button>
    );
}
