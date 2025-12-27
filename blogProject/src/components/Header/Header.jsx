import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
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
    {
      name: "You",
      slug: "/you",
      active: authStatus,
    },
  ];

  return (
    <div className="w-full h-auto mb-4">
      <nav className="py-2 bg-gray-600 border rounded-xl ">
        <div className="flex ">
          <div className="px-5 pt-1 text-gray-400">
            <Logo />
          </div>
          <ul className="outline-none flex ml-auto pr-8 text-gray-950">
            {navItems.map((items) =>
              items.active ? (
                <li className="mx-8 px-2 " key={items.name}>
                  <button onClick={() => navigate(items.slug)}>
                    {items.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
