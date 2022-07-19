import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Teamcard({
  name,
  position,
  mail,
  image,
}: {
  name: string;
  position: string;
  mail: string;
  image: string;
}) {
  const styles = {
    display: "grid",
    width: "260px",
  };
  return (
    <div className="wrapper p-2 mx-auto w-[240px]" style={styles}>
      {/* <div> */}
      <img
        src={image}
        alt=" random imgee"
        className="w-full object-cover object-center rounded-lg shadow-md"
      />

      <div className="relative px-4 -mt-16">
        <div className="bg-[rgb(49,40,40)] dark:bg-white p-4 rounded-lg shadow-lg">
          <div className="text-center items-baseline">
            <div className=" dark:text-gray-600 text-white uppercase text-xs font-semibold tracking-wider">
              {name}
            </div>
            <div className=" dark:text-gray-600 text-white uppercase text-xs font-semibold tracking-wider">
              {position}
            </div>
          </div>

          <a href={`mailto:${mail}`} className="mt-1 flex justify-around">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="dark:text-gray-600 text-white"
            />
            <span className="text-sm text-center text-white dark:text-gray-600">
              {mail}
            </span>
          </a>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Teamcard;
