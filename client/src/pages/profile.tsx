import React, { useEffect, useState, useContext } from "react";
import { navigate } from "gatsby";
import { userContext } from "../layouts";

type myobj = {
  itemName: string;
  total: string;
  available: number;
  pic: string;
  category: string;
};
function profile() {
  const { user, handlelogin, logout } = useContext(userContext);
  useEffect(() => {
    if (user) {
    } else {
      navigate("/");
    }
  });
  const [pending, setpending] = useState<Array<myobj>>([]);
  const [completed, setcompleted] = useState<Array<myobj>>([]);
  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/api/users/borrow/pending/${user}`).then(
        (res) => {
          res.json().then((re) => {
            if (res.status === 200) {
              // for (let index = 0; index < re.pendingRequests.length; index++) {
              //   const element = re.pendingRequests[index].itemName;
              //   setpending([...pending, element]);
              // }
              setpending(re.pendingRequests);
            } else {
              console.log(re);
            }
          });
        }
      );
      fetch(`http://localhost:5000/api/users/borrow/completed/${user}`).then(
        (res) => {
          res.json().then((re) => {
            if (res.status === 200) {
              // for (let index = 0; index < re.completedRequests.length; index++) {
              //   const element = re.completedRequests[index].itemName;
              //   setcompleted([...completed, element]);
              // }
              setcompleted(re.completedRequests);
            } else {
              console.log(re);
            }
          });
        }
      );
    }
  }, [user]);
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
          {pending && pending.length ? (
            <ol className="list-disc">
              {pending.map((item, index) => (
                <li key={index}>{item.itemName}</li>
              ))}
            </ol>
          ) : (
            <h3 className="text-lg md:text-xl">
              No pending requests available
            </h3>
          )}
          <br />
          <hr />
          <br />
          <h1 className="text-lg md:text-2xl text-lightprimary dark:text-darkprimary font-extrabold">
            Your previous borrowings
          </h1>
          <br />
          {completed && completed.length ? (
            <ol className="list-disc">
              {completed.map((item, index) => (
                <li key={index}>{item.itemName}</li>
              ))}
            </ol>
          ) : (
            <h3 className="text-lg md:text-xl">
              No Completed requests available
            </h3>
          )}
        </div>
      )}
    </>
  );
}

export default profile;
