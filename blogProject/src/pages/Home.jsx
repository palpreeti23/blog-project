import React, { useEffect, useState } from "react";
import { CoverImage, PostCard } from "../components";
import appwriteService from "../appwrite/post";
import { setPosts } from "../store/PostSlice";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const authStatus = useSelector((state) => state.auth.status);

  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearch, setRecentSearch] = useState([]);
  const [FilteredPost, setFilteredPost] = useState([]);

  useEffect(() => {
    if (!authStatus) return;
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        dispatch(setPosts(posts.documents));
        setFilteredPost(posts.documents);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredPost(posts);
      return;
    }

    const searchItem = (searchQuery || "").toLowerCase();
    const searchedPost = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchItem) ||
        post.content.toLowerCase().includes(searchItem)
    );

    setFilteredPost(searchedPost);
  }, [posts, searchQuery]);

  const handleKeyStroke = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      if (!recentSearch.includes(searchQuery)) {
        setRecentSearch((prev) => [searchQuery, ...prev].slice(0, 5));
      }
    }
  };

  return (
    <div className="w-full flex flex-col ">
      <div className="w-full h-auto ">
        <CoverImage />
      </div>
      <div className="flex w-full h-auto mx-3">
        <div className="w-1/4 bg-gray-100  shadow-lg shadow-gray-400 mt-4">
          <div className=" w-4/5 h-auto ml-5 mt-5">
            <div className="flex flex-col">
              <input
                type="text"
                className="w-full border border-gray-400 rounded py-1 mt-2 px-3 "
                placeholder="Search here..."
                value={searchQuery}
                onKeyDown={handleKeyStroke}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {recentSearch.length > 0 && (
                <div className="flex flex-col">
                  <h2 className="mt-5 text-lg mx-1 font-semibold">
                    Recent Searches
                  </h2>
                  <div className="mt-1">
                    {recentSearch.map((item, index) => (
                      <button
                        className="list-none ml-1 bg-blue-200 text-blue-700 px-3  rounded"
                        key={index}
                        onClick={() => setSearchQuery(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className=" w-3/4 bg-gray-100 shadow-lg shadow-gray-400 ml-4 mt-4">
          <ul className="flex flex-wrap  mx-2 gap-2">
            {FilteredPost.length === 0 && <p>No Posts Yet....</p>}

            {FilteredPost?.map((post) => (
              <li key={post.$id} className="mx-1">
                <PostCard {...post} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
