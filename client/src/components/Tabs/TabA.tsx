import React from "react";
import Form from "../Form";

function TabA({ user }: { user: string }) {
  return (
    <div
      className="tab-pane fade show active"
      id="tabs-homeVertical"
      role="tabpanel"
      aria-labelledby="tabs-home-tabVertical"
    >
      <h1 className="w-full text-center p-4 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900 dark:text-white">
        Add new Item
      </h1>
      <Form type="admin" user={user} />
    </div>
  );
}

export default TabA;
