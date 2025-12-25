import React, { forwardRef } from "react";

function Button({
  children,
  type,
  className = "",
  bgColor = "bg-blue-500",
  textColor = "black",
  ...props
}) {
  return (
    <button
      type={type}
      className={` py-2 px-3 border rounded-xl my-3 ${bgColor}${className}${textColor}`}
      {...props}
      //   ref={ref}
    >
      {children}
    </button>
  );
}

export default Button;
