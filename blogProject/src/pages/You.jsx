import React from "react";
import { Container, MyPost } from "../components";
import { Outlet } from "react-router-dom";

function You() {
  return (
    <Container>
      <MyPost />
      {/* <Outlet /> */}
    </Container>
  );
}

export default You;
