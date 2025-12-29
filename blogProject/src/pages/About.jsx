import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    // <div className="flex flex-col h-auto bg-gray-200 rounded-2xl  py-5">
    //   <Link to={`/`}>
    //     <div className="text-center text-3xl mx-10 my-3 ">
    //       <p className="bg-gray-400 w-15 rounded-xl px-4 pb-1"> &larr;</p>
    //     </div>
    //   </Link>
    <div className=" flex items-center justify-center flex-col my-8">
      <div className="w-2/3 h-auto bg-gray-50 rounded-3xl py-3 px-5 my-5 ">
        <h2 className="font-bold text-xl text-gray-900 text-left mt-2">
          ABOUT
        </h2>
        <p className="text-gray-700 text-left my-2 ">
          This blog is a personal project built to document learnings, ideas,
          and experiments in web development.
        </p>
        <p className="text-gray-700 text-left my-2 ">
          The goal of this project is to practice building real-world features —
          from authentication and content management to clean UI and performance
          — while sharing practical knowledge along the way.
        </p>
        <p className="text-gray-700 text-left my-2 ">
          The content here focuses on things learned through building,
          debugging, and iterating on real projects.
        </p>
        <div>
          <h3 className="font-bold text-lg text-gray-600 text-left mt-3">
            Build With —
          </h3>
          <ul className="text-gray-700 text-left my-2 list-disc px-5 font-medium">
            <li>React for the user interface</li>
            <li>Appwrite for authentication, database, and storage</li>
            <li>Tailwind CSS for styling and layout</li>
          </ul>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default About;
