import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/post";
import { deletePost, setPost } from "../store/PostSlice";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { Container, Comments, Button, LikeSection } from "../components";
import { Link } from "react-router-dom";

function Post() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post } = useSelector((state) => state.post);
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const [open, setOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          dispatch(setPost(post));
        }
      });
    }
  });

  const deletePosts = async () => {
    setOpen(false);
    await appwriteService.deletePostData(post.$id).then((post) => {
      if (post) {
        dispatch(deletePost(post));
      }
    });
  };

  const EditPost = () => {
    setOpen(false);
    navigate(`/edit-post/${post.$id}`);
  };

  const images = post?.featuredImage
    ? appwriteService.getFilePreview(post.featuredImage)
    : false;

  if (!post) {
    return <p>loading...</p>;
  }
  return (
    <div className="w-full h-auto flex flex-col  items-center ">
      <div className="w-2/3 flex flex-col mt-5 bg-gray-100 rounded-xl p-2 ">
        <div className="w-full ">
          <img
            className="h-80 w-full rounded-lg object-cover"
            src={images}
            alt="post image"
          />

          <h2 className="text-gray-900 text-xl text-left px-3 py-2">
            {post.title}
          </h2>
          <p className="text-gray-800 text-left px-3 py-1">
            {parse(post.content)}
          </p>
        </div>

        <div className="flex items-center gap-3 justify-start ml-3">
          <LikeSection post={post} />

          <button
            className="ml-3 text-gray-700 relative"
            onClick={() => setCommentOpen(!commentOpen)}
          >
            <i class="fa-regular fa-comment"></i>
          </button>

          {isAuthor && (
            <div className="relative ">
              <button className="text-gray-700" onClick={() => setOpen(!open)}>
                <i class="fa-solid fa-ellipsis"></i>
              </button>
              {open && (
                <div
                  className={`flex flex-col px-1 text-sm bg-gray-200 transform transition-all duration-200 ease-out rounded-sm absolute`}
                >
                  <button className="" onClick={EditPost}>
                    Edit
                  </button>

                  <button className="" onClick={deletePosts}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {commentOpen && (
        <div className="w-[67%] ">
          <Comments />
        </div>
      )}
    </div>
  );
}

export default Post;
