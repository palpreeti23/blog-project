import React from "react";
import { logout } from "../../store/AuthSlice";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logOut().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button onClick={logoutHandler} className="text-gray-950">
      Logout
    </button>
  );
}

export default LogoutBtn;
