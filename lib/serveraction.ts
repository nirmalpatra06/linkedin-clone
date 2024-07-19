"use server";

import { Post } from "@/models/post.model";
import { IUser } from "@/models/user.model";
import { v2 as cloudinary } from 'cloudinary';
import connectDb from "./db";
import { currentUser } from "@clerk/nextjs/server";

cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME, 
    api_key:process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

export const createPostAction = async (
  inputText: string,
  selectedImg: string
) => {
    await connectDb();
    const user=await currentUser();
  if (!user) throw new Error("User not authenticated");
  if (!inputText) throw new Error("Input field is required");

  const image = selectedImg;
  const databaseUser: IUser = {
    firstName : user.firstName || "Nirmal",
    lastName : user.lastName || "Patra",
    userId :user.id,
    profilePhoto : user.imageUrl,
  };
  let uploadResponse;
  try {
    if (image) {
      //   create post with image
      uploadResponse=await cloudinary.uploader.upload(image)
      await Post.create({
        description:inputText,
        user:databaseUser,
        imageUrl:uploadResponse?.secure_url
      });
    } else {
      // create post with only text
      await Post.create({
        description:inputText,
        user:databaseUser
      })
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
