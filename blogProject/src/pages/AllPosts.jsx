import React, { useEffect } from "react";
import appwriteService from "../appwrite/post";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../store/PostSlice";
import { Container, PostCard } from "../components";
// import { UseSelector } from "react-redux";

function AllPosts() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (!authStatus) return;
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        dispatch(setPosts(posts.documents));
      }
    });
  }, [dispatch]);
  return (
    <div className="w-full mt-5">
      <ul className="flex justify-around flex-wrap">
        {posts?.map((post) => (
          <li key={post.$id} className="mx-3">
            <PostCard {...post} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllPosts;
