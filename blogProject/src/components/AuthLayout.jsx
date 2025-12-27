import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ authentication = true, children }) {
  const authStatus = useSelector((state) => state.auth.status);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication && authStatus != authentication) {
      navigate("/login");
    } else if (!authentication && authStatus != authentication) {
      navigate("/");
    }
    setLoading(false);
  }, [navigate, authStatus, authentication]);

  if (loading) {
    return <p>loading...</p>;
  }

  return <div>{children}</div>;
}

export default AuthLayout;
