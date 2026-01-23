import React from "react";

function Button({
  children,
  type,
  onClick,
  className = "",
  bgColor = "bg-blue-500",
  textColor = "black",
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`border border-gray-500 rounded-xl my-3 py-2 px-3 w-full ${bgColor}${className}${textColor}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
