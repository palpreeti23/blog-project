import React, { useEffect } from "react";
import { PostCard } from "../components";
import appwriteService from "../appwrite/post";
import { setPosts } from "../store/PostSlice";
import { useDispatch, useSelector } from "react-redux";
import images from "../img/Gemini_Generated_Image_qtfelgqtfelgqtfe.png";

function Home() {
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
    <div className="w-full flex flex-col">
      <div className="w-full h-auto">
        <img
          className="w-full h-90 object-cover rounded-2xl"
          src={images}
          alt="image"
        />
      </div>
      <ul className="flex">
        {posts?.map((post) => (
          <li key={post.$id} className="mx-3">
            <PostCard {...post} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
