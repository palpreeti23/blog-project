import React, { useState } from "react";
import images from "../img/ChatGPT Image Dec 23, 2025, 11_58_52 PM.png";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/post";
import parse from "html-react-parser";

function PostCard({ title, featuredImage, $id, content }) {
  const images = featuredImage
    ? appwriteService.getFilePreview(featuredImage)
    : null;

  const [expand, setExpand] = useState(false);

  return (
    <div className="w-60 h-auto rounded-xl border bg-gray-200 shadow-gray-600 shadow-2xl my-3 ">
      <div className="flex flex-col ">
        <Link to={`/post/${$id}`}>
          <img
            className="w-full h-40 object-cover rounded-xl"
            src={images}
            alt="placeholder"
          />
        </Link>
        <h2 className="text-gray-900 text-xl text-left px-3 py-1 ">{title}</h2>
        <div>
          <p
            className={`text-gray-800 text-left px-3 ${
              expand ? "" : "line-clamp-1"
            }`}
          >
            {parse(content)}
          </p>
          <button
            className=" text-sm text-blue-400 hover:underline pb-2 cursor-pointer block px-3 "
            onClick={() => setExpand(!expand)}
          >
            {expand ? "Read less" : "Read more"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
