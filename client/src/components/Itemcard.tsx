import React from "react";

function Itemcard({
  name,
  total,
  available,
  pic,
  category,
}: {
  name: string;
  total: string;
  available: number;
  pic: string;
  category: string;
}) {
  const handleborrow = () => {};
  return (
    <div>
      <div
        className="max-w-sm my-auto w-[250px] bg-white dark:border-none border-2 rounded-lg 
      shadow-md dark:bg-gray-800 dark:border-gray-700"
      >
        <img className="p-8 rounded-t-lg" src={pic} alt="product image" />
        <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
            {name}
          </h5>
          <h5 className="text-[16px] tracking-tight text-gray-900 dark:text-white text-center">
            category: {category}
            <hr />
          </h5>
          <br />
          <div className="flex justify-between items-center">
            <span
              className="text-[14px] md:text-[16px] text-gray-900 
            dark:text-white"
            >
              Total:{total} &nbsp; Available:{available}
            </span>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 
              focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={handleborrow}
            >
              Borrow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Itemcard;
