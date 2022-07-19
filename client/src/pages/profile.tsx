import React, { useEffect, useState, useContext } from "react";
import { navigate } from "gatsby";
import { userContext } from "../layouts";
function profile() {
  const { user, handlelogin, logout } = useContext(userContext);
  useEffect(() => {
    if (user) {
    } else {
      navigate("/");
    }
  });
  const [pending, setpending] = useState<Array<String>>([]);
  useEffect(() => {
    setpending([
      ...pending,
      "Now this is a story all about how, my life got flipped-turned upside down",
      "Now this is a story all about how, my life got flipped-turned upside down",
    ]);
  }, []);
  return (
    <>
      {user && (
        <div className="py-[5vw] mx-[5vw]">
          <h1 className="text-center text-xl md:text-3xl text-lightprimary dark:text-darkprimary font-extrabold">
            Your Profile and activity
          </h1>
          <br />
          <p className="text-center">Your email: {user}</p>
          <br />
          <h1 className="text-lg md:text-2xl text-lightprimary dark:text-darkprimary font-extrabold">
            Your pending requests
          </h1>
          <br />
          <ul className="list-disc">
            {pending.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <br />
          <h1 className="text-lg md:text-2xl text-lightprimary dark:text-darkprimary font-extrabold">
            Your previous borrowings
          </h1>
          <br />
          <ul className="list-disc">
            {pending.map((item, index) => (
              <li key={index} className="mx-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default profile;
