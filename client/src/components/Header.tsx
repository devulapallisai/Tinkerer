import { Link } from "gatsby";
import React, { useEffect } from "react";
import * as styles from "../css/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { ThemeContext } from "./Themeprovider";
import { useContext } from "react";
import { adminContext, userContext } from "../layouts";

function Header() {
  const theme = React.useContext(ThemeContext);
  const [icon, seticon] = React.useState(
    theme.theme == "dark" ? faMoon : faSun
  );
  const modechange = () => {
    if (theme.theme == "dark") {
      theme.setTheme("light");
      seticon(faSun);
    } else {
      theme.setTheme("dark");
      seticon(faMoon);
    }
  };
  const { admins }: { admins: string[] } = useContext(adminContext);
  const { user, handlelogin, logout } = useContext(userContext);

  return (
    <div className="py-3 md:py-5 text-[16px] md:text-xl bg-[hsl(177,79%,95%)] dark:bg-[hsl(221,39%,9%)] w-[100vw] dark:text-darkprimary text-lightprimary">
      <div className="max-w-[90vw] md:max-w-[86vw] med:max-w-[70vw] mx-auto">
        <div className="flex justify-between">
          <div className="font-extrabold">
            <Link className="cursor-pointer" to="/">
              <span className="text-lg md:font-xl">&gt;</span> Tinkerers lab
              &nbsp;
              <span className={styles.blink}></span>
            </Link>
          </div>
          <div className="md:text-[16px] text-[13px] hidden md:flex">
            <div
              className="px-2 dark:hover:text-darksecondary 
            hover:text-lightsecondary"
            >
              <Link to="/">Home</Link>
            </div>
            {user && (
              <>
                <div
                  className="px-2 dark:hover:text-darksecondary 
            hover:text-lightsecondary"
                >
                  <Link to="/suggest">Suggest</Link>
                </div>
                <div
                  className="px-2 dark:hover:text-darksecondary 
            hover:text-lightsecondary"
                >
                  <Link to="/items">Items</Link>
                </div>
                <div
                  className="px-2 dark:hover:text-darksecondary 
            hover:text-lightsecondary"
                >
                  <Link to="/profile">Profile</Link>
                </div>
              </>
            )}
            {admins.includes(user) && (
              <div
                className="px-2 dark:hover:text-darksecondary 
            hover:text-lightsecondary"
              >
                <Link to="/admin">Admin</Link>
              </div>
            )}
            <div
              className="px-2 dark:hover:text-darksecondary 
            hover:text-lightsecondary"
            >
              <Link to="/#team">Contact</Link>
            </div>
            <div
              className="px-2 dark:hover:text-darksecondary 
            hover:text-lightsecondary border-r-2 border-lightprimary dark:border-darkprimary"
            >
              <button
                type="button"
                className="text-white from-pink-500 to-orange-400 bg-gradient-to-br dark:from-green-400 dark:to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg 
                text-sm px-5 py-1.5 text-center"
                onClick={user ? logout : handlelogin}
              >
                {user ? "Logout" : "Login"}
              </button>
            </div>
            <div className="px-4 cursor-pointer">
              <FontAwesomeIcon
                icon={icon}
                onClick={modechange}
                className="hover:mb-[2px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
