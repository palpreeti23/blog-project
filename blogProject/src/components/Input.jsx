import React from "react";
import { useId, forwardRef } from "react";

function Input({ label, type, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor="id"
          className={`text-left text-black px-2 mt-2 ${className}`}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={` w-full bg-gray-200 border rounded-xl px-3 py-2 m-1 text-gray-700 text-lg  ${className}`}
        {...props}
        id={id}
        ref={ref}
      />
    </div>
  );
}

export default forwardRef(Input);
