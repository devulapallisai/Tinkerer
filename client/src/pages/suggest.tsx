import React, { useContext, useEffect } from "react";
import { userContext } from "../layouts";
import { navigate } from "gatsby";
import Form from "../components/Form";
function suggest() {
  const { user, handlelogin, logout } = useContext(userContext);
  useEffect(() => {
    if (user) {
    } else {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="py-[5vw]">
      {user && (
        <>
          <h1 className="text-center text-xl md:text-3xl text-lightprimary dark:text-darkprimary font-extrabold">
            Suggest new components{" "}
          </h1>
          <br />
          <br />
          <Form user={user} type={"suggest"} />
        </>
      )}
    </div>
  );
}

export default suggest;
