import React, { useEffect } from "react";
import appwriteService from "../appwrite/post";
import { useDispatch } from "react-redux";
import { setPosts } from "../store/PostSlice";
import { Container, PostCard } from "../components";

function AllPosts() {
  const dispatch = useDispatch();
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      dispatch(setPosts(posts.documents));
    });
  });
  return (
    <Container>
      <PostCard />
    </Container>
  );
}

export default AllPosts;
