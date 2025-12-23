import React from "react";

function Container({ children }) {
  return (
    <div className="w-full h-auto bg-gray-100 m-2 px-3 py-2 rounded-xl ">
      {children}
    </div>
  );
}

export default Container;
