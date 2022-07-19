import React, { useState, useContext } from "react";
import Snackbar from "./Snackbar";
import { itemsContext } from "../layouts";

function Form({ user, type }: { user: string; type: string }) {
  const [cat, setcat] = useState("Electronic");
  const [name, setname] = useState("");
  const [numbe, setnumber] = useState<number>(1);
  const [file, setfile] = useState<File | null>(null);
  // const [pic, setpic] = useState<string>("");
  const [snackbaropen, setsnackbarclose] = useState(false);
  // const [snackbarclose, setsnackbarclose] = useState(false);
  const [snackbarmode, setmode] = useState("");
  const [snackbarMessage, setmsg] = useState("");
  const { items, setitems } = useContext(itemsContext);
  const handlesuggest = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "admin") {
      if (file === null || file === undefined) {
        const d = {
          name: name,
          cat: cat,
          no: numbe,
        };
        fetch("http://localhost:5000/api/items/", {
          method: "POST",
          headers: {
            authorization: "Bearer " + user,
            "Content-type": "application/json",
          },
          body: JSON.stringify(d),
        }).then((res) => {
          if (res.status === 200) {
            res.json().then((res) => {
              console.log(res);
              setsnackbarclose(true);
              setmode("Success");
              setitems([...items, res]);
              setmsg("New item inserted :)");
              setcat("Electronic");
              setname("");
              setnumber(1);
              setfile(null);
            });
          } else {
            setsnackbarclose(true);
            setmode("Danger");
            setmsg("Error with new item creation");
            setcat("Electronic");
            setname("");
            setnumber(1);
            setfile(null);
          }
        });
      } else if (file.type === "image/jpeg" || file.type === "image/png") {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "tinkerer");
        data.append("cloud_name", "dotdtp38v");
        fetch("https://api.cloudinary.com/v1_1/dotdtp38v/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            // setpic(data.url.toString());
            const d = {
              name: name,
              cat: cat,
              pic: data.url.toString(),
              no: numbe,
            };
            fetch("http://localhost:5000/api/items/", {
              method: "POST",
              headers: {
                authorization: "Bearer " + user,
                "Content-type": "application/json",
              },
              body: JSON.stringify(d),
            }).then((res) => {
              if (res.status === 200) {
                res.json().then((res) => {
                  console.log(res);
                  setsnackbarclose(true);
                  setmode("Success");
                  setitems([...items, res]);
                  setmsg("New item inserted :)");
                  setcat("Electronic");
                  setname("");
                  setnumber(1);
                  setfile(null);
                });
              } else {
                setsnackbarclose(true);
                setmode("Danger");
                setmsg("Error with new item creation");
                setcat("Electronic");
                setname("");
                setnumber(1);
                setfile(null);
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      fetch("http://localhost:5000/api/users/suggest", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          suggestion: name,
          category: cat,
          email: user,
        }),
      }).then((res) => {
        res.json().then((re) => {
          if (res.status === 400) {
            setsnackbarclose(true);
            setmsg(re.title);
            setmode("Danger");
            setname("");
          } else {
            setsnackbarclose(true);
            setname("");
            setmsg(re.title);
            setmode("Success");
          }
        });
      });
    }
  };
  return (
    <div className="container">
      <form
        onSubmit={(e) => {
          handlesuggest(e);
          return false;
        }}
      >
        {type === "suggest" && (
          <>
            <label
              htmlFor="email-address-icon"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your Email
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <input
                type="text"
                id="email-address-icon"
                value={user}
                readOnly
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
          rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
          pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 outline-none
          dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com"
              />
            </div>
            <br />
          </>
        )}

        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Select category
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 
          text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
          w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
          dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          value={cat}
          onChange={(e) => setcat(e.target.value)}
          required
        >
          <option>Electronic</option>
          <option>Mechanical</option>
          <option>Board Modules</option>
          <option>Measurement instruments</option>
          <option>Accessories</option>
        </select>
        <br />

        <label
          htmlFor="website-admin"
          className="block mb-2 text-sm font-medium text-gray-900 
          dark:text-gray-300"
        >
          Name of the item
        </label>
        <div className="flex">
          <span
            className="inline-flex items-center px-3 text-sm text-gray-900 
            bg-gray-200 rounded-l-md border border-r-0 border-gray-300 
          dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
          >
            @
          </span>
          <input
            type="text"
            id="website-admin"
            className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full 
          text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder="Oscilloscope"
            required
          />
        </div>
        <br />

        {type === "admin" && (
          <>
            <label
              htmlFor="website-admin"
              className="block mb-2 text-sm font-medium text-gray-900 
          dark:text-gray-300"
            >
              Quantity
            </label>
            <div className="flex">
              <span
                className="inline-flex items-center px-3 text-sm text-gray-900 
            bg-gray-200 rounded-l-md border border-r-0 border-gray-300 
          dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
              >
                @
              </span>
              <input
                type="number"
                id="website-admin"
                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full 
          text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                value={numbe}
                onChange={(e) => setnumber(e.target.value)}
                required
              />
            </div>
            <br />
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="user_avatar"
            >
              Upload file
            </label>
            <input
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="user_avatar_help"
              id="user_avatar"
              onChange={(e) =>
                setfile(e.target.files ? e.target.files[0] : null)
              }
              accept=".png,.jpg,.jpeg"
              type="file"
            />
            <div
              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="user_avatar_help"
            >
              Images of item if any
            </div>
            <br />
          </>
        )}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium 
          rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700  dark:focus:ring-blue-800 outline-none"
        >
          Submit
        </button>
      </form>
      {snackbaropen && (
        <Snackbar
          snackbarmode={snackbarmode}
          setsnackbarclose={setsnackbarclose}
          snackbarMessage={snackbarMessage}
          snackbaropen={snackbaropen}
        />
      )}
    </div>
  );
}

export default Form;
