import React, { useState } from "react";
type myobj = {
  itemName: string;
  total: string;
  available: number;
  pic: string;
  category: string;
};
function Adminedit({
  user,
  selected,
  setselected,
}: {
  user: string;
  selected: myobj;
  setselected: React.Dispatch<SetStateAction<myobj | null>>;
}) {
  const [newname, setnewname] = useState(selected.itemName);
  const [newno, setnewno] = useState<number>(Number(selected.total));
  const [newavai, setnewavi] = useState<number>(selected.available);
  const [newcat, setnewcat] = useState(selected.category);
  const handlesave = () => {
    if (newavai > newno || newname === "") {
      alert("There seems something wrong ");
    } else {
      fetch("http://localhost:5000/api/items/update", {
        method: "PUT",
        headers: {
          authorization: "Bearer " + user,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          dname: selected.itemName,
          name: newname,
          total: newno,
          cat: newcat,
          no: newavai,
        }),
      }).then((res) =>
        res.json().then((re) => {
          if (res.status === 200) {
            alert("Item successfully updated");
            setnewname("");
            setnewavi(1);
            setnewno(1);
            setnewcat("Electronic");
            setselected(null);
          } else {
            alert("Item not updated");
          }
        })
      );
    }
  };
  const handleremove = () => {
    fetch("http://localhost:5000/api/items/remove", {
      method: "PUT",
      headers: {
        authorization: "Bearer " + user,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        dname: selected.itemName,
      }),
    }).then((res) =>
      res.json().then((re) => {
        if (res.status === 200) {
          alert("Item successfully Deleted");
          setnewname("");
          setnewavi(1);
          setnewno(1);
          setnewcat("Electronic");
          setselected(null);
        } else {
          alert("Item not deleted");
        }
      })
    );
  };
  return (
    <div>
      <label
        htmlFor="website-admin"
        className="block mb-2 text-sm font-medium text-gray-900 
          dark:text-gray-300"
      >
        Name of the Item
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
          value={newname}
          onChange={(e) => setnewname(e.target.value)}
          required
        />
      </div>
      <br />
      <label
        htmlFor="website-admin"
        className="block mb-2 text-sm font-medium text-gray-900 
          dark:text-gray-300"
      >
        Total
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
          value={newno}
          onChange={(e) => setnewno(e.target.value)}
          required
        />
      </div>
      <br />
      <label
        htmlFor="website-admin"
        className="block mb-2 text-sm font-medium text-gray-900 
          dark:text-gray-300"
      >
        Available
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
          value={newavai}
          onChange={(e) => setnewavi(e.target.value)}
          required
        />
      </div>
      <br />
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
        value={newcat}
        onChange={(e) => setnewcat(e.target.value)}
        required
      >
        <option>Electronic</option>
        <option>Mechanical</option>
        <option>Board Modules</option>
        <option>Measurement instruments</option>
        <option>Accessories</option>
      </select>
      <br />
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium 
          rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700  dark:focus:ring-blue-800 outline-none max-h-[40px] my-auto mx-2"
        onClick={handlesave}
      >
        Save
      </button>
      <button
        type="button"
        className="text-white ml-3 bg-blue-700 hover:bg-blue-800 font-medium 
          rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700  dark:focus:ring-blue-800 outline-none max-h-[40px] my-auto mx-2"
        onClick={handleremove}
      >
        Remove
      </button>
    </div>
  );
}

export default Adminedit;
