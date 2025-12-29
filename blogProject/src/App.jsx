import { useEffect, useState } from "react";
import "./App.css";
import { Footer, Header, MyPost } from "./components";
import { Outlet } from "react-router-dom";
import authService from "./appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/AuthSlice";

function App() {
  const [loading, setLoading] = useState(true);
  // const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const userData = await authService.getCurrentUser();

      if (userData) {
        dispatch(login(userData));
      } else {
        dispatch(logout());
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col ">
      {/* <Header /> */}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
