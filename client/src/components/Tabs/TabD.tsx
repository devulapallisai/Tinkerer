import React from "react";
type myobj = {
  email: string;
  suggestion: string;
};

function TabD({ Suggestions }: { Suggestions: Array<myobj> }) {
  return (
    <div
      className="tab-pane fade"
      id="tabs-profileVertical"
      role="tabpanel"
      aria-labelledby="tabs-profile-tabVertical"
    >
      <h1 className="py-2 text-xl md:text-3xl dark:text-white text-gray-900">
        Suggestions
      </h1>
      {Suggestions && Suggestions.length ? (
        <ul className="list-disc">
          {Suggestions.map((item, index) => (
            <li key={index} className="p-1 text-lg md:text-xl">
              From {item.email} - {item.suggestion}
            </li>
          ))}
        </ul>
      ) : (
        <h1 className="text-xl md:text-3xl">No suggestions found</h1>
      )}
    </div>
  );
}

export default TabD;
