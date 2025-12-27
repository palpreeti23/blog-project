import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
function Footer() {
  return (
    <footer className="w-full h-auto mt-8">
      <div className="bg-gray-600 rounded-xl border">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <div className="mt-3 mr-8">
              <Logo />
            </div>
            <p className="text-gray-300  font-medium mt-5 ml-5 ">
              Hi, i'm Preeti - learning and writing about code.
            </p>
          </div>

          <div className="flex justify-around">
            <div className="text-gray-400 text-center font-medium my-10">
              <p>&copy; 2025 All Rights Reserved.</p>
            </div>

            <div className="my-1 flex flex-col mt-4">
              <p className="text-gray-400 font-bold">CONNECT</p>
              <ul className="my-2 ml-4 text-left pl-2 list-disc text-gray-900">
                <li className=" my-1">
                  <Link to={"https://github.com/palpreeti23"}>Github</Link>
                </li>
                <li className=" my-1">
                  <Link
                    to={"https://www.linkedin.com/in/preeti-pal-955409236/"}
                  >
                    LinkedIn
                  </Link>
                </li>
                <li className="my-1 ">
                  <Link to={"https://x.com/Palpreeti05"}>X</Link>
                </li>
              </ul>
            </div>

            <div className="my-1 flex flex-col mt-4 ">
              <p className="text-gray-400 font-bold">TECH</p>
              <ul className="my-2 ml-4 text-left pl-2 list-disc text-gray-900">
                <li className="my-1">React</li>
                <li className="my-1">Tailwind</li>
                <li className="my-1">Appwrite</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
