import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import Logo from "../Logo";

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  // console.log(authStatus);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "AllPosts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "About",
      slug: "/about",
      active: authStatus,
    },
  ];

  return (
    <div className="w-full h-auto ">
      <nav className="py-2 bg-gray-800 ">
        <div className="flex flex-wrap justify-around ">
          <div className="px-5 pt-1 text-gray-400 ">
            {/* <Logo /> */}
            <div className="text-white font-semibold pacifico-regular text-2xl ">
              BLOG
            </div>
          </div>
          <ul className=" w-[50%] outline-none flex flex-wrap  justify-around text-gray-100 text-lg pt-2 mr-10 ">
            {navItems.map((items) =>
              items.active ? (
                <li className="mx-2 px-2 " key={items.name}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-orange-400" : "text-gray-100"
                    }
                    to={items.slug}
                  >
                    {items.name}
                  </NavLink>
                </li>
              ) : //  <li className="mx-2 px-2 " key={items.name}>
              //     <button onClick={() => navigate(items.slug)}>
              //       {items.name}
              //     </button>
              //   </li>

              null
            )}

            {authStatus && (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-orange-400" : "text-gray-100"
                  }
                  to={"/you"}
                >
                  <FaUserCircle size={24} />
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
