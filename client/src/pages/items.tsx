import React, { useEffect, useContext, useState } from "react";
import { navigate } from "gatsby";
import { itemsContext, userContext } from "../layouts";
import Itemcard from "../components/Itemcard";

type myobj = {
  itemName: string;
  total: string;
  available: number;
  pic: string;
  category: string;
};
function borrow() {
  const { items, setitems } = useContext(itemsContext);
  const { user, handlelogin, logout } = useContext(userContext);
  const [filitems, setfilitems] = useState<Array<myobj>>(items);

  useEffect(() => {
    if (user) {
    } else {
      navigate("/");
    }
  });
  const [cat, setcat] = useState("All");
  const [name, setname] = useState("");
  const categoryEffect = (cat: string) => {
    const filtered =
      cat === "All" ? items : items.filter((item) => item.category === cat);
    setfilitems(filtered);
  };
  const nameEffect = (name: string) => {
    const pattern = new RegExp(name, "i");
    const filtered = items.filter((item) => pattern.test(item.itemName));
    setfilitems(filtered);
  };
  return (
    <>
      {user && (
        <div className="py-[5vw]">
          <div className="flex flex-col-reverse md:flex-row justify-between">
            <h1 className="text-xl md:text-3xl font-extrabold dark:text-darkprimary text-lightprimary">
              All Results
            </h1>
            <div className="flex flex-col md:flex-row">
              <div className="px-2 my-1">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 
          dark:text-gray-400"
                >
                  Filter by category
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 
        text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
        w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                  value={cat}
                  onChange={(e) => {
                    setcat(e.target.value);
                    categoryEffect(e.target.value);
                  }}
                  required
                >
                  <option>All</option>
                  <option>Electronic</option>
                  <option>Mechanical</option>
                  <option>Board Modules</option>
                  <option>Measurement instruments</option>
                  <option>Accessories</option>
                </select>
              </div>
              <div className="px-2 my-1">
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
                    onChange={(e) => {
                      nameEffect(e.target.value);
                      setname(e.target.value);
                    }}
                    placeholder="Bonnie Green"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="flex justify-around md:flex-row flex-col flex-wrap mx-auto">
            {filitems && filitems.length ? (
              filitems.map((item, index) => (
                <span className="p-1">
                  <Itemcard
                    key={index}
                    name={item.itemName}
                    pic={item.pic}
                    available={item.available}
                    total={item.total}
                    user={user}
                    category={item.category}
                  />
                </span>
              ))
            ) : (
              <>
                <div className="min-h-[60vh] text-xl dark:text-darkprimary text-lightprimary md:font-3xl">
                  Currently no items available
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default borrow;
