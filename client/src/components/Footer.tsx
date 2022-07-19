import React from "react";
import { Link } from "gatsby";
import * as styles from "../css/Header.module.css";

function Footer() {
  return (
    <div className="py-4 md:pt-16 md:pb-8 text-[16px] md:text-xl w-[100vw] dark:text-darkprimary text-lightprimary max-w-[90vw] md:max-w-[86vw] med:max-w-[70vw] mx-auto">
      <div className="flex md:flex-row flex-col text-center justify-between">
        <div className="font-extrabold">
          <Link className="cursor-pointer" to="/">
            <span className="text-lg md:font-xl">&gt;</span> Tinkerers lab IITH
            &nbsp;
            <span className={styles.blink}></span>
          </Link>
        </div>
        <div className="md:text-[16px] text-[13px] md:flex">
          <p>Tinkerers Team. Copyright © 2022</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
