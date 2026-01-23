import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Button, Post } from "./index";
import commentService from "../appwrite/comment";
import { FaUserCircle } from "react-icons/fa";
import { addComment, deleteComment, setComments } from "../store/CommentSlice";

function Comments() {
  const { register, handleSubmit, reset } = useForm();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const { comments } = useSelector((state) => state.comment);
  // const [open, setOpen] = useState(false);

  useEffect(() => {
    if (slug) {
      if (!slug) return;
      commentService.getComments(slug).then((comment) => {
        if (comment) {
          dispatch(setComments(comment.documents));
        }
      });
    }
  }, [slug]);

  const create = async (data) => {
    const newComment = await commentService.createComment({
      content: data.comment,
      postId: slug,
      userId: userData.$id,
      userName: userData.name,
    });

    if (newComment) {
      dispatch(addComment(newComment));
      reset();
    }
  };

  const deleteCom = (commentId) => {
    commentService.deleteComments(commentId).then((comment) => {
      if (comment) {
        dispatch(deleteComment(comment));
      }
    });
  };

  const timeAgo = (time) => {
    const minute = Math.floor((Date.now() - new Date(time)) / 60000);
    const hour = Math.floor(minute / 60);
    const days = Math.floor(hour / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);

    if (minute < 1) return "just now";
    if (minute < 60) return `${minute} minute ago`;
    if (hour < 24) return `${hour} hour ago`;
    if (days < 7) return `${days} days ago`;
    if (weeks < 4) return `${weeks} weeks ago`;
    if (months < 12) return `${months} months ago`;
  };

  return (
    <div className="w-full h-auto flex flex-col mt-8 z-30 p-4 shadow shadow-gray-500 bg-gray-50 rounded-lg text-gray-600">
      <div className="w-full">
        <h2 className="font-medium text-xl text-left text-gray-600">
          COMMENTS
        </h2>
        <form onSubmit={handleSubmit(create)}>
          <div className="flex h-20 w-full relative">
            <Input
              labelClassName="text-gray-800 "
              type="text"
              placeholder="Type your comment"
              className="w-full mt-4 h-12 border-none "
              {...register("comment", { required: true })}
            />
            <button
              type="submit"
              className=" bg-blue-600 hover:bg-blue-500 text-white active:bg-blue-800 h-[59%] px-4 py-1 rounded-r-xl absolute right-0 mt-4"
            >
              Add
            </button>
          </div>
        </form>
      </div>

      <div>
        <ul>
          {comments?.map((comment) => {
            const isAuthor =
              comment && userData ? comment.userId === userData.$id : null;
            return (
              <li
                className="w-full bg-white px-3 py-1 rounded-xl text-medium  text-left mb-2 flex flex-col text-gray-950"
                key={comment.$id}
              >
                <div className="flex justify-between">
                  <p className="text-medium text-gray-700 flex m-0 ">
                    <span className="pr-1">
                      <FaUserCircle size={25} />
                    </span>
                    <span> {comment.userName || "unknown"}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      {timeAgo(comment.$createdAt)}
                    </span>
                  </p>

                  {isAuthor && (
                    <p className="text-xl ">
                      <button
                        onClick={() => deleteCom(comment.$id)}
                        class="text-gray-400 hover:text-red-600 text-sm"
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </p>
                  )}
                </div>

                <div className="mx-7">{comment.content}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Comments;
