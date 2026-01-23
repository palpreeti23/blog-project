import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appwriteService from "../appwrite/post";
import { setPosts } from "../store/PostSlice";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import LogoutBtn from "./Header/LogoutBtn";
import { FaUserCircle } from "react-icons/fa";

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
    <div className="w-full h-screen  flex">
      <div className="w-1/4  flex flex-col justify-center ">
        <div className="w-[80%] h-auto bg-gray-100 shadow-lg shadow-gray-400 rounded mx-auto mb-3 pb-5 ">
          <div className="flex justify-start ml-2 py-3 flex-wrap pt-8">
            <FaUserCircle size={38} className="text-gray-500" />

            <div className="flex flex-col px-2 flex-wrap pt-1">
              <p className="text-gray-600 leading-none ">Welcome,</p>
              <h2 className="font-medium text-xl px-1 text-gray-800 leading-tight">
                {userData.name}
              </h2>
            </div>
          </div>
        </div>

        <div className="w-[80%] h-screen bg-gray-100 shadow-lg shadow-gray-400 rounded mx-auto mb-3 ">
          <div className="flex flex-col my-3">
            <button
              onClick={() => navigate("/you/create-post")}
              className="hover:border hover:shadow-xl whitespace-normal mx-3 w-2/3 px-3 py-1 my-5 rounded-lg text-center bg-blue-500 hover:bg-blue-500 active:bg-blue-700  "
            >
              + Create Post
            </button>

            <button className="hover:border hover:shadow-xl mx-3 w-2/3  py-1 rounded-lg whitespace-normal min-w-[30%] text-center bg-gray-500 hover:bg-gray-500 active:bg-gray-700">
              <LogoutBtn />
            </button>
          </div>
        </div>
      </div>

      <div className="w-3/4 ">
        <div className=" bg-gray-100 h-screen shadow-lg shadow-gray-400 rounded mb-3 flex flex-col mx-auto ">
          <h2 className=" font-medium text-left my-3 text-xl px-8">
            Your Posts ({authorPosts.length})
          </h2>

          {authorPosts.length === 0 ? (
            <p className="text-gray-500 px-9">No posts yet..</p>
          ) : (
            <ul className=" my-5 flex flex-wrap gap-5">
              {authorPosts.map((posts) => (
                <li key={posts.$id} className="mx-4">
                  <div className="bg-gray-200 border rounded-2xl w-60">
                    <Link to={`/post/${posts.$id}`}>
                      <img
                        className="h-30 w-full rounded-lg object-cover"
                        src={
                          posts.featuredImage
                            ? appwriteService.getFilePreview(
                                posts.featuredImage
                              )
                            : null
                        }
                        alt="postimage"
                      />
                    </Link>
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
    </div>

    // <div className="flex flex-col w-full  ">
    //   <div className="rounded-2xl my-3 ">
    //     <div className="flex justify-center mt-4 border-b-2 border-gray-600 pb-1 w-20 mx-auto mb-5 flex-wrap">
    //       <p className=" border rounded-2xl px-1.5 pt-1 bg-gray-500">
    //         <i class="fa-solid fa-user"></i>
    //       </p>
    //       <h2 className="font-medium text-center text-2xl px-2 ">
    //         {userData.name}
    //       </h2>
    //     </div>

    //     <div className="flex flex-wrap">
    //       <div className="w-1/7 bg-white flex flex-col rounded-xl pt-4 px-3 flex-wrap">
    //         <Button
    //           onClick={() => navigate("/you/create-post")}
    //           className="hover:border hover:shadow-xl whitespace-normal min-w-[20%] text-center "
    //           bgColor="bg-blue-500 hover:bg-blue-500 active:bg-blue-700 "
    //         >
    //           + Create Post
    //         </Button>

    //         <Button
    //           className="hover:border hover:shadow-xl whitespace-normal min-w-[20%] text-center "
    //           bgColor="bg-gray-500 hover:bg-gray-500 active:bg-gray-700 "
    //         >
    //           <LogoutBtn />
    //         </Button>
    //       </div>

    //       <div className="w-3/4 h-auto flex px-4 flex-wrap">
    //         <div className="w-full rounded-2xl">
    //           <h2 className=" font-medium text-left my-8 text-xl px-8">
    //             Your Posts ({authorPosts.length})
    //           </h2>

    //           {authorPosts.length === 0 ? (
    //             <p className="text-gray-400">No posts yet..</p>
    //           ) : (
    //             <ul className=" my-5 flex flex-wrap gap-5">
    //               {authorPosts.map((posts) => (
    //                 <li key={posts.$id} className="mx-4">
    //                   <div className="bg-gray-200 border rounded-2xl w-60">
    //                     <Link to={`/post/${posts.$id}`}>
    //                       <img
    //                         className="h-30 w-full rounded-lg object-cover"
    //                         src={
    //                           posts.featuredImage
    //                             ? appwriteService.getFilePreview(
    //                                 posts.featuredImage
    //                               )
    //                             : null
    //                         }
    //                         alt="postimage"
    //                       />
    //                     </Link>
    //                     <h2 className={`text-gray-900  text-left px-3 py-1 `}>
    //                       {posts.title}
    //                     </h2>
    //                     <div>
    //                       <p
    //                         className={`text-gray-900  text-left px-3  ${
    //                           expand ? "" : "line-clamp-1"
    //                         }`}
    //                       >
    //                         {parse(posts.content)}
    //                       </p>
    //                       <button
    //                         className=" text-sm text-blue-400 hover:underline pb-2 cursor-pointer block px-3 "
    //                         onClick={() => setExpand(!expand)}
    //                       >
    //                         {expand ? "Read less" : "Read more"}
    //                       </button>
    //                     </div>
    //                   </div>
    //                 </li>
    //               ))}
    //             </ul>
    //           )}

    //         </div>
    //       </div>

    //     </div>
    //   </div>
    // </div>
  );
}

export default MyPost;

{
  /* 
        <div className="bg-gray-100 h-auto shadow-lg shadow-gray-400 rounded mb-3">
          <div className=" w-1/2 flex flex-col mx-4 items-start py-3 flex-wrap text-gray-700">
            <button
              onClick={() => navigate("/you/create-post")}
              className=" whitespace-normal px-3 text-lg"
            >
              + Create Post
            </button>
          </div>
        </div>

        <div className="bg-gray-100 h-auto shadow-lg shadow-gray-400 rounded mb-3">
          <div className=" w-1/2 flex flex-col mx-4 items-start py-3 flex-wrap text-gray-700">
            <button className="  whitespace-normal  text-center ">
              <LogoutBtn />
            </button>
          </div>
        </div> */
}
