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
//Created post using server actions
export const createPostAction = async (
  user:any,
  inputText: string,
  selectedImg: string
) => {
  // const nUser=user;
    await connectDb();
    // const clerkUser=await currentUser();
    // console.log(clerkUser);
    
  if (!user) throw new Error("User is not authenticated");
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
//Get all Post using server actions
export const getAllPost=async()=>{
  await connectDb();
  try {
    const posts =await Post.find().sort({createdAt:-1});
    // console.log(posts);
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.log(error);
    
    
  }
}