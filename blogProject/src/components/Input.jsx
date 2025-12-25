import React from "react";
import { useId, forwardRef } from "react";

function Input({ label, type, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor="id" className={`text-white text-left px-2 mt-2`}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={` w-full bg-gray-300 border rounded-xl px-3 py-2 mb-5 mt-1 text-gray-700 text-lg  ${className}`}
        {...props}
        id={id}
        ref={ref}
      />
    </div>
  );
}

export default forwardRef(Input);
