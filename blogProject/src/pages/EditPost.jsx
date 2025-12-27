import React, { useEffect } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/post";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../store/PostSlice";

function EditPost() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post } = useSelector((state) => state.post);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          dispatch(setPost(post));
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return (
    <div>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
}

export default EditPost;
