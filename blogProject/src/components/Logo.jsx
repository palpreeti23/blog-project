import React from "react";

function Logo({ className = "" }) {
  return (
    <div className="w-full h-auto ml-3">
      <img
        className={`h-10 w-30 object-cover rounded-lg ${className}`}
        src="/src/img/logo.png"
        alt="image"
      />
    </div>
  );
}

export default Logo;
