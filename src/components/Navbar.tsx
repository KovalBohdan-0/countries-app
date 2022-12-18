import { Link } from "react-router-dom";

export default function Navbar(props: any) {

    function changeDarkMode() {
        props.setDarkMode((prevDarkMode: any) => !prevDarkMode);
        localStorage.setItem('darkMode', `${!props.darkMode}`);
    }

    return (
        <div className="fixed z-10 flex bg-stone-200 dark:bg-slate-800 w-full h-16 items-center px-10 bg-gradient-to-l dark:from-slate-900 from-white drop-shadow-lg dark:text-white text-black">
            <Link to={"/"} className="font-extrabold dark:text-white sm:text-xl text-base">Where in the world?</Link>
            <div className='switcher ml-auto toggle-switch relative bg-slate-400 dark:bg-slate-600 w-16 h-7 rounded-xl'>
                <p className="absolute right-20 whitespace-nowrap font-semibold text-lg sm:visible invisible">Dark Mode</p>
                <input className="dark-mode w-full h-full" type='checkbox' checked={props.darkMode} value="1" onChange={changeDarkMode} />
                <span className="slider bg-white dark:bg-slate-900 block w-5 h-5 absolute top-1 left-9 dark:left-2 duration-500 rounded-full"></span>
            </div>
        </div>
    );
}