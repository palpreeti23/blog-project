import React from "react";
// import { useNavigate } from "react-router-dom";

function Header() {
  // const navigate = useNavigate();
  // const navItems = [
  //   {
  //     name: "Home",
  //     slug: "/",
  //     // active: authStatus,
  //   },
  //   {
  //     name: "AllPosts",
  //     slug: "/all-posts",
  //     // active: authStatus,
  //   },
  //   {
  //     name: "About",
  //     slug: "/about",
  //     // active: authStatus,
  //   },
  //   {
  //     name: "You",
  //     slug: "/you",
  //     // active: authStatus,
  //   },
  //   {
  //     name: "Logout",
  //     slug: "/logout",
  //     // active: authStatus,
  //   },
  // ];

  const navItems = ["Home", "Contact", "About", "You", "Logout"];

  return (
    <div className="w-full h-auto">
      <nav className="py-2 bg-gray-600 border rounded-xl ">
        <div className="flex ">
          <div className="px-5 pt-1 text-gray-400">LOGO</div>
          <ul className="outline-none flex ml-auto pr-8 text-gray-950">
            {navItems?.map((items) => (
              // items.active ? (
              //   <li className="mx-8 px-2 " key={items.name}>
              //     {/* <button onClick={() => navigate(items.slug)}>
              //       {items.name}
              //     </button> */}
              //     <button>{items.name}</button>
              //   </li>
              // ) : null

              <li className="mx-8 px-2 " key={items}>
                <button>{items}</button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
