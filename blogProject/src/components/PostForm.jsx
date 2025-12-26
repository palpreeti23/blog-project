import React, { useCallback, useEffect, useState } from "react";
import { Input, RTE, Button } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/post";
import { addPost, updatePost } from "../store/PostSlice";
import images from "../img/Gemini_Generated_Image_qtfelgqtfelgqtfe.png";

function PostForm({ post }) {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        slug: post?.slug || "",
        featuredImage: post?.featuredImage || "",
        status: post?.status || "active",
      },
    });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const create = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadfile(data.image[0])
        : null;
      if (file) {
        await appwriteService.deletefile(post.featuredImage);
      }
      const dbPost = await appwriteService.updatePostData({
        ...data,
        featuredImage: file?.$id,
      });
      if (dbPost) {
        dispatch(updatePost(dbPost));
        navigate("/");
      }
    } else {
      const file = data.image[0]
        ? await appwriteService.uploadfile(data.image[0])
        : null;
      const fileId = file.$id;
      data.featuredImage = fileId;
      const dbpost = await appwriteService.createPost({
        ...data,
        userId: userData?.$id,
      });
      if (dbpost) {
        dispatch(addPost(dbpost));
        navigate("/");
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "-");

    return "";
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(title.value));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(create)}
      className="w-full h-auto bg-gray-200 rounded-2xl p-3"
    >
      <div className="flex flex-wrap my-4">
        <div className="w-2/3  pb-5 pl-5">
          <div className="w-4/5 ">
            <Input
              label="Title"
              labelClassName="text-gray-800 "
              type="text"
              placeholder="Enter your title"
              className="bg-white w-1/2 "
              {...register("title", { required: true })}
            />

            <Input
              label="Slug"
              type="text"
              placeholder="See your slug"
              className="bg-white "
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
            <div className="">
              <RTE
                label="content"
                name="content"
                control={control}
                defaultValue={getValues("content")}
              />
            </div>
          </div>
        </div>

        <div className="w-1/3 pr-5 ">
          <div className="w-full h-50 my-7">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full rounded-lg object-cover"
              />
            ) : (
              <img
                src={images}
                alt="Preview"
                className="h-full w-full rounded-lg object-cover"
              />
            )}
          </div>

          <Input
            label="image"
            type="file"
            accept="image/jpeg, image/jpg, imag/svg, image/png, image/gif"
            placeholder="add your image"
            className="my-1 w-2/3 bg-white"
            {...register("image")}
            onChange={handleImageChange}
          />

          {post && (
            <div className="w-full h-auto object-contain">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                className="rounded-lg w-full h-30"
                alt={post.title}
              />
            </div>
          )}

          <Button
            type="submit"
            bgColor={
              post
                ? "bg-green-500 hover:bg-green-700 active:bg-green-800"
                : "bg-blue-400  hover:bg-blue-600 active:bg-blue-800"
            }
            className=""
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
}
export default PostForm;
