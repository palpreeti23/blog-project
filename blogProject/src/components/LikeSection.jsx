import React, { useEffect, useState } from "react";
import commentService from "../appwrite/comment";
import { useSelector } from "react-redux";
import { set } from "react-hook-form";

function LikeSection({ post }) {
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!post) {
      return <p>loading....</p>;
    }
    commentService.likeCount({ postId: post.$id, type: "like" }).then(setLike);
    commentService
      .likeCount({ postId: post.$id, type: "dislike" })
      .then(setDislike);
  }, [post]);

  const react = async (type) => {
    await commentService.toggleLikes({
      postId: post.$id,
      userId: userData.$id,
      type,
    });

    setLike(await commentService.likeCount({ postId: post.$id, type: "like" }));
    setDislike(
      await commentService.likeCount({ postId: post.$id, type: "dislike" })
    );
  };

  return (
    <div className="inline-flex">
      <div className="flex gap-4">
        <button className=" text-gray-700 " onClick={() => react("like")}>
          <i className="fa-solid fa-thumbs-up"></i>
          {like}
        </button>
        <button className=" text-gray-700 " onClick={() => react("dislike")}>
          <i className="fa-solid fa-thumbs-up rotate-180"></i>
          {dislike}
        </button>
      </div>
    </div>
  );
}

export default LikeSection;
