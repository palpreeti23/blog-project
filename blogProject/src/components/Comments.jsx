import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import appwriteService from "../appwrite/post";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Comments() {
  const { register, handleSubmit } = useForm();
  const { slug } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const [comments, setComments] = useState([]);
  //   const [comment, setComment] = useState("");

  useEffect(() => {
    if (slug) {
      appwriteService.getComments([]).then((comment) => {
        if (comment) {
          setComments(comment.documents);
        }
      });
    }
  });

  const create = async (data) => {
    await appwriteService.createComment({
      ...data,
      userId: userData.$id,
    });
  };

  return (
    <div className="w-2/3 h-auto flex flex-col">
      <div className="w-full">
        <form onSubmit={handleSubmit(create)}>
          <Input
            label="Comments"
            labelClassName="text-gray-800 "
            type="text"
            placeholder="Enter your comment"
            className="bg-white w-1/2 "
            {...register("comment", { required: true })}
          />
          <Button
            type="submit"
            bgColor={`bg-blue-400  hover:bg-blue-600 active:bg-blue-800`}
            className=""
          >
            add
          </Button>
        </form>
      </div>

      <div>
        <ul>
          {comments?.map((comments) => (
            <li
              className="w-2/3 bg-white px-3 py-1 rounded-xl "
              key={comments.$id}
            >
              {comments.comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Comments;
