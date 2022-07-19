import React, { useEffect, useState } from "react";
type myobj = {
  itemName: string;
  total: string;
  available: number;
  pic: string;
  category: string;
  _id: string;
};
function TabC({ user }: { user: string }) {
  const [requests, setrequests] = useState<Array<[myobj, string]>>([]);
  useEffect(() => {
    if (user) {
      fetch("http://localhost:5000/api/admins/pendingrequests", {
        headers: {
          authorization: "Bearer " + user,
        },
      }).then((res) =>
        res.json().then((re) => {
          setrequests(re);
          console.log(re);
        })
      );
    }
  }, [user]);
  const handleapprove = (item: [myobj, string]) => {
    const user = item[1];
    const id = item[0]._id;
    fetch("http://localhost:5000/api/admins/approvereq", {
      method: "PUT",
      headers: {
        authorization: "Bearer " + user,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: user,
        id: id,
      }),
    }).then((res) =>
      res.json().then((re) => {
        if (res.status === 200) {
          console.log(re);
          alert("Approved");
        } else {
          alert("Something went wrong");
        }
      })
    );
  };
  return (
    <div
      className="tab-pane fade"
      id="tabs-profileVertical"
      role="tabpanel"
      aria-labelledby="tabs-profile-tabVertical"
    >
      <h1 className="w-full text-center p-4 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900 dark:text-white">
        User Requests
      </h1>
      {requests && requests.length ? (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table
            className="w-full text-sm text-left text-gray-500
         dark:text-gray-400"
          >
            <thead
              className="text-xs text-gray-700 uppercase bg-gray-50
           dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  Requested Item
                </th>
                <th scope="col" className="py-3 px-6">
                  Total
                </th>
                <th scope="col" className="py-3 px-6">
                  Available
                </th>
                <th scope="col" className="py-3 px-6">
                  Approve/not
                </th>
              </tr>
            </thead>
            <tbody>
              {requests &&
                requests.length &&
                requests.map((item, index) => (
                  <tr
                    className={`${
                      index % 2 == 0
                        ? "bg-white dark:bg-gray-900"
                        : "bg-gray-50 dark:bg-gray-800"
                    } border-b  
            dark:border-gray-700`}
                    key={index}
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item[1]}
                    </th>
                    <td className="py-4 px-6">{item[0].itemName}</td>
                    <td className="py-4 px-6">{item[0].total}</td>
                    <td className="py-4 px-6">{item[0].available}</td>
                    <td className="py-4 px-6">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleapprove(item)}
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-xl md:text-3xl py-2">No requests found</h1>
      )}
    </div>
  );
}

export default TabC;
