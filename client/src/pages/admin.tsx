import { navigate } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import TabA from "../components/Tabs/TabA";
import TabB from "../components/Tabs/TabB";
import TabC from "../components/Tabs/TabC";
import TabD from "../components/Tabs/TabD";
import { adminContext, userContext } from "../layouts";

type myobj = {
  email: string;
  suggestion: string;
};
function Admin() {
  let { admins }: { admins: string[] } = useContext(adminContext);
  let { setadmins }: { setadmins: React.SetStateAction<string> } =
    useContext(adminContext);
  const { user } = useContext(userContext);
  const [admin, setadmin] = React.useState("");
  const [Suggestions, setsuggestions] = useState<Array<myobj> | []>([]);
  useEffect(() => {
    if (Array.isArray(admins) && admins.length) {
      if (!admins.includes(user)) {
        navigate("/");
      }
    }
  });
  useEffect(() => {
    fetch("http://localhost:5000/api/admins/allsuggestions", {
      headers: {
        authorization: "Bearer " + user,
      },
    }).then((res) =>
      res.json().then((re) => {
        setsuggestions(re);
      })
    );
  }, []);
  const addadmin = () => {
    if (admin.includes("@iith.ac.in")) {
      fetch("http://localhost:5000/api/admins/", {
        method: "POST",
        headers: {
          authorization: "Bearer " + user,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: admin,
        }),
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((re) => {
            admins.push(admin);
            alert(re.title);
            setadmin("");
          });
        }
      });
    } else {
      alert("You have to add using IITH email IDs.");
    }
  };
  const removeadmin = () => {
    fetch("http://localhost:5000/api/admins/remove", {
      method: "PUT",
      headers: {
        authorization: "Bearer " + user,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: admin,
      }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((re) => {
          alert(re.title);
          let filtered = admins.filter((item) => item !== admin);
          setadmins(filtered);
          setadmin("");
        });
      }
    });
  };
  const [tabIndex, settabIndex] = React.useState(0);
  const tabs = ["Add Item", "Update Item", "Approve", "Suggestions"];
  return (
    <>
      {user && admins.includes(user) ? (
        <div className="py-[5vw]">
          <h3 className="text-center p-4 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900 dark:text-white">
            All <span className="text-indigo-600">Admins</span>
          </h3>
          <div className="flex flex-col overflow-x-hidden pb-4">
            {admins.map((item, index) => (
              <h3
                key={index}
                className="text-center p-1 text-lg sm:text-xl leading-normal tracking-tight text-green-700"
              >
                {item}
              </h3>
            ))}
          </div>
          <h3 className="text-center p-4 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900 dark:text-white">
            Add | Remove <span className="text-indigo-600">Admin</span>
          </h3>
          <div className="py-2 flex w-full justify-center">
            <div className="flex items-center border-b border-teal-500 py-2">
              <input
                className="sm:w-[400px] w-[200px] appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="johndoe@gmail.com"
                aria-label="Full name"
                value={admin}
                onChange={(e) => setadmin(e.target.value)}
              />
              <br />
              <button
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="button"
                onClick={addadmin}
              >
                Add
              </button>
              <button
                className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
                type="button"
                onClick={removeadmin}
              >
                Remove
              </button>
            </div>
          </div>
          <br />
          <hr />
          <br />
          <div className="md:flex md:items-start">
            <ul
              className="nav nav-tabs flex flex-col flex-wrap list-none border-b-0 pl-0 mr-4"
              id="tabs-tabVertical"
              role="tablist"
            >
              {tabs.map((item, index) => (
                <li
                  className="nav-item flex-grow text-center"
                  role="presentation"
                  key={index}
                >
                  <button
                    onClick={() => settabIndex(index)}
                    className="
                    nav-link
                    block
                    font-medium
                    text-xs
                    leading-tight
                    uppercase
                    border-x-0 border-t-0 border-b-2 border-transparent
                    px-6
                    py-3
                    my-2
                    hover:border-transparent hover:bg-gray-100
                    focus:border-transparent
                  "
                    id="tabs-messages-tabVertical"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-messagesVertical"
                    role="tab"
                    aria-controls="tabs-messagesVertical"
                    aria-selected="false"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
            <div
              className="tab-content md:border-l-4 md:pl-4"
              id="tabs-tabContentVertical"
            >
              {tabIndex === 0 ? (
                <TabA user={user} />
              ) : tabIndex === 1 ? (
                <TabB user={user} />
              ) : tabIndex === 2 ? (
                <TabC />
              ) : (
                <TabD Suggestions={Suggestions} />
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Admin;
