import React, { useState } from "react";
import images from "../img/ChatGPT Image Dec 23, 2025, 11_58_52 PM.png";
// import { Link } from "react-router-dom";
// import appwriteService from "../appwrite/post"
// {
//   title, featureImage, $id, content;
// }

function PostCard() {
  // images = featureImage? appwriteService.getFilePreview(featureImage) : null;
  const [expand, setExpand] = useState(false);

  return (
    // <Link>
    <div className="w-1/3 h-auto rounded-xl border bg-gray-200 shadow-gray-600 shadow-2xl">
      <div className="flex flex-col ">
        <img
          className="w-full h-40 object-cover rounded-xl"
          src={images}
          alt="placeholder"
        />
        <h2 className="text-gray-900 text-xl text-left px-3 py-2 ">title</h2>
        <div>
          <p
            className={`text-gray-800 text-left px-3 py-1 ${
              expand ? "" : "line-clamp-3"
            }`}
          >
            content: Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Laudantium autem delectus ad laborum at consequuntur odit qui esse
            debitis neque.
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
    // {/* </Link> */}
  );
}

export default PostCard;
