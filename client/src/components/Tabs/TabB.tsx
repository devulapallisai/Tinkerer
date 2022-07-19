import React, { useContext, useState } from "react";
import { itemsContext } from "../../layouts";
import Adminedit from "../Adminedit";
type myobj = {
  itemName: string;
  total: string;
  available: number;
  pic: string;
  category: string;
};
function TabB({ user }: { user: string }) {
  const { items, setitems } = useContext(itemsContext);
  const [search, setsearch] = useState("");
  const [selected, setselected] = useState<myobj | null>(null);
  const handlefilter = () => {
    if (search !== "") {
      const pattern = new RegExp(search, "i");
      const filtered = items.filter((item) => pattern.test(item.itemName));
      if (filtered.length) {
        setselected(filtered[0]);
        setsearch("");
      } else {
        alert("No matching items ");
      }
    }
  };

  return (
    <div
      className="tab-pane fade"
      id="tabs-profileVertical"
      role="tabpanel"
      aria-labelledby="tabs-profile-tabVertical"
    >
      <h1 className="py-2 text-xl md:text-3xl dark:text-white text-gray-900">
        Update Item
      </h1>
      <br />
      <div className="flex">
        <div>
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
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              placeholder="Oscilloscope"
              required
            />
          </div>
        </div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium 
          rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700  dark:focus:ring-blue-800 outline-none max-h-[40px] my-auto mx-2"
          onClick={handlefilter}
        >
          Search
        </button>
      </div>
      <br />
      {selected && (
        <>
          <hr />
          <br />
          <h1 className="py-2 text-xl md:text-3xl dark:text-white text-gray-900">
            Edit Item
          </h1>

          <Adminedit
            user={user}
            selected={selected}
            setselected={setselected}
          />
        </>
      )}
    </div>
  );
}

export default TabB;
