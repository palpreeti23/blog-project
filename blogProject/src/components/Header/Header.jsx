import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
      <nav className="py-1 bg-gray-600 border rounded-lg">
        <div className="flex flex-wrap justify-between">
          <div className="px-5 pt-1 text-gray-400">
            <Logo />
          </div>
          <ul className="outline-none flex flex-wrap justify-around pr-16 text-gray-950 pt-2">
            {navItems.map((items) =>
              items.active ? (
                <li className="mx-2 px-2 " key={items.name}>
                  <button onClick={() => navigate(items.slug)}>
                    {items.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <button
                  className="border rounded-4xl bg-gray-500 px-1 "
                  onClick={() => navigate("/you")}
                >
                  <i class="fa-solid fa-user"></i>
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
