import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appwriteService from "../appwrite/post";
import { setPosts } from "../store/PostSlice";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

function MyPost() {
  const userData = useSelector((state) => state.auth.userData);
  const { posts } = useSelector((state) => state.post);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authorPosts = posts.filter((post) => post.userId === userData.$id);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    if (!userData) return;

    appwriteService
      .getPosts([])
      .then((posts) => {
        if (posts) {
          dispatch(setPosts(posts.documents));
        }
      })
      .finally(() => setLoading(false));
  }, [userData]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full h-auto flex justify-center items-center">
      <div className="w-2/3 rounded-2xl">
        <h2 className="text-gray-800 font-bold text-center my-5 text-xl">
          Your Posts
        </h2>
        <div className="flex justify-around">
          <p className="text-gray-600 text-sm text-left ml-8 my-3 mt-4">
            posts ({authorPosts.length})
          </p>
          <Button
            onClick={() => navigate("/you/create-post")}
            className="hover:border hover:shadow-xl "
            bgColor="bg-blue-500 hover:bg-blue-500 active:bg-blue-700 "
          >
            + Create Post
          </Button>
        </div>

        {authorPosts.length === 0 ? (
          <p className="text-gray-400">No posts yet..</p>
        ) : (
          <ul className="space-y-4 flex flex-wrap my-5">
            {authorPosts.map((posts) => (
              <li key={posts.$id}>
                <div className="bg-gray-200 border rounded-2xl w-70 mx-3">
                  <img
                    className="h-30 w-full rounded-lg object-cover"
                    src={
                      posts.featuredImage
                        ? appwriteService.getFilePreview(posts.featuredImage)
                        : null
                    }
                    alt="postimage"
                  />
                  <h2 className={`text-gray-900  text-left px-3 py-1 `}>
                    {posts.title}
                  </h2>
                  <div>
                    <p
                      className={`text-gray-900  text-left px-3  ${
                        expand ? "" : "line-clamp-1"
                      }`}
                    >
                      {parse(posts.content)}
                    </p>
                    <button
                      className=" text-sm text-blue-400 hover:underline pb-2 cursor-pointer block px-3 "
                      onClick={() => setExpand(!expand)}
                    >
                      {expand ? "Read less" : "Read more"}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MyPost;
