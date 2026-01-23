import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
function Footer() {
  return (
    <footer className="w-full h-auto mt-8 bg-gray-800 text-gray-300 flex justify-center items-center">
      <div className=" w-2/3 ">
        <div className="flex flex-col flex-wrap">
          {/* <div className="flex justify-center flex-wrap">
            <div className="mt-3 mr-8">
              <Logo />
            </div>
            <p className="text-white font-medium mt-5 ml-5 ">
              Hi, i'm Preeti - learning and writing about code.
            </p>
          </div> */}

          <div className="flex justify-around ">
            <div className="my-1 flex flex-col mt-4 ">
              <p className="text-white font-bold">QUICK LINKS</p>
              <ul className="my-2 ml-4 text-left pl-2 list-disc ">
                <li className=" my-1">
                  <Link to={"/"}>Home</Link>
                </li>
                <li className=" my-1">
                  <Link to={"/about"}>About</Link>
                </li>

                <li className="my-1 ">
                  <Link to={"/you"}>Profile</Link>
                </li>
              </ul>
            </div>

            <div className="my-1 flex flex-col mt-4 ">
              <p className="text-white font-bold">CONNECT</p>
              <ul className="my-2 ml-4 text-left pl-2 list-disc ">
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
              <p className="text-white font-bold px-3">TECH</p>
              <ul className="my-2 ml-4 text-left pl-2 list-disc ">
                <li className="my-1">React</li>
                <li className="my-1">Tailwind</li>
                <li className="my-1">Appwrite</li>
              </ul>
            </div>
          </div>
          <div className=" text-white text-center font-medium mx-auto mb-4">
            <p>&copy; 2025 All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
