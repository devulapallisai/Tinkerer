import React from "react";
import Teamcard from "./Teamcard";
import Image from "../images/user.png";

function Team() {
  const teammembers = [
    {
      name: "Hello",
      position: "Hello",
      mail: "mail@gmail.com",
      image: Image,
    },
    {
      name: "Hello",
      position: "Hello",
      mail: "mail@gmail.com",
      image: Image,
    },
    {
      name: "Hello",
      position: "Hello",
      mail: "mail@gmail.com",
      image: Image,
    },
    {
      name: "Hello",
      position: "Hello",
      mail: "mail@gmail.com",
      image: Image,
    },
  ];
  return (
    <div id="team" className="flex flex-row mx-auto flex-wrap">
      {teammembers.map((item, index) => (
        <Teamcard
          key={index}
          name={item.name}
          position={item.position}
          mail={item.mail}
          image={item.image}
        />
      ))}
    </div>
  );
}

export default Team;
