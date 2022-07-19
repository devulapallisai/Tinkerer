import React, { SetStateAction, useContext, useState } from "react";
import { Link } from "gatsby";
import * as styles from "../css/hamburger.module.css";
import { adminContext, userContext } from "../layouts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
function Mobilemenu({
  icon,
  modechange,
}: {
  icon: IconDefinition;
  modechange: () => void;
}) {
  const [hamburger, sethamburger] = useState(false);
  const { admins }: { admins: string[] } = useContext(adminContext);
  const { user, logout, handlelogin } = useContext(userContext);
  return (
    <>
      <div className="fixed top-3 right-6 z-[100000]">
        <label
          className={`${styles.label} fixed top-3 right-6`}
          htmlFor="check"
        >
          <input
            type="checkbox"
            id="check"
            style={{ zIndex: 100000000000 }}
            className={styles.check}
            onClick={() => {
              sethamburger(!hamburger);
            }}
          />
          <span className={`${styles.labelspan} dark:bg-white bg-black`}></span>
          <span className={`${styles.labelspan} dark:bg-white bg-black`}></span>
          <span className={`${styles.labelspan} dark:bg-white bg-black`}></span>
        </label>
      </div>
      {hamburger && (
        <>
          <div className="fixed right-0 h-[100vh] w-[60vw] top-0 bg-[hsl(221,39%,21%)]">
            <div
              className={`mt-[15vh] text-[20px] text-center ${
                user ? "h-[56vh]" : "h-[30vh]"
              } flex flex-col justify-between`}
            >
              <div className="px-2 text-white">
                <Link to="/">Home</Link>
              </div>
              {user && (
                <>
                  <div className="px-2 text-white">
                    <Link to="/suggest">Suggest</Link>
                  </div>
                  <div className="px-2 text-white">
                    <Link to="/items">Items</Link>
                  </div>
                  <div className="px-2 text-white">
                    <Link to="/profile">Profile</Link>
                  </div>
                </>
              )}
              {admins.includes(user) && (
                <div className="px-2 text-white">
                  <Link to="/admin">Admin</Link>
                </div>
              )}
              <div className="px-2 text-white">
                <Link to="/#team">Contact</Link>
              </div>
              <div className="px-2 text-white">
                <button
                  type="button"
                  className="text-white from-pink-500 to-orange-400 
                  bg-gradient-to-br dark:from-green-400 dark:to-blue-600 
                  hover:bg-gradient-to-bl font-medium rounded-lg 
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
                  className="hover:mb-[2px] text-white"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Mobilemenu;
