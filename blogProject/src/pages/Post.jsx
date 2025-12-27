import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import appwriteService from "../appwrite/post";
import { deletePost, setPost } from "../store/PostSlice";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
// import images from "../img/Gemini_Generated_Image_qtfelgqtfelgqtfe.png";
import { Container, Comments, Button } from "../components";
import { Link } from "react-router-dom";

function Post() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          dispatch(setPost(post));
        }
      });
    }
  });

  const images = post?.featuredImage
    ? appwriteService.getFilePreview(post.featuredImage)
    : false;

  if (!post) {
    return <p>loading...</p>;
  }
  return (
    <div className="w-full h-auto flex flex-col bg-gray-200 rounded-xl pl-4">
      <div className="w-2/3 flex flex-col mt-5 ">
        <div className=" ">
          <img
            className="h-60 w-full rounded-lg object-cover"
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

        {isAuthor && (
          <div>
            <Link to={`/edit-post/${post.$id}`}>
              <Button
                className="hover:border hover:shadow-xl mr-4 "
                bgColor="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 "
              >
                Edit
              </Button>
            </Link>
            <Button
              className="hover:border hover:shadow-xl "
              bgColor="bg-red-500"
              onClick={deletePost}
            >
              delete
            </Button>
          </div>
        )}

        {/* <Container>
          <Comments />
        </Container> */}
      </div>
    </div>
  );
}

export default Post;
