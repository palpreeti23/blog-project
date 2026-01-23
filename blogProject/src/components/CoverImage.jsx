import React from "react";
import { useNavigate } from "react-router-dom";

function CoverImage() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-80 relative">
      <img
        className="w-full h-full object-cover"
        src="https://www.forbes.com/advisor/wp-content/uploads/2022/06/How_To_Start_A_Blog_-_article_image.jpg"
        alt="image"
      />

      <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded text-center">
        <h2 className="text-6xl text-white font-semibold  my-3 dancing-script">
          Welcome to our Blog
        </h2>
        <p className="font-xl text-white mb-2 font-semibold ">
          Insights, Stories and Ideas for the Curious Mind
        </p>

        <button
          onClick={() => navigate("/all-posts")}
          className="px-3 py-2 rounded bg-orange-500 shadow shadow-gray-600 text-white my-3 font-semibold "
        >
          Read Our Latest Blog
        </button>
      </div>
    </div>
  );
}

export default CoverImage;
