"use server";

import { Post } from "@/models/post.model";
import { IUser } from "@/models/user.model";
import { v2 as cloudinary } from 'cloudinary';
import connectDb from "./db";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";
import { Comment } from "@/models/comment.model";
// import { currentUser } from "@clerk/nextjs/server";


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
    firstName : user?.firstName || "Nirmal",
    lastName : user?.lastName || "Patra",
    userId :user?.id,
    profilePhoto : user?.imageUrl,
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
    revalidatePath("/");
  } catch (error: any) {
    throw new Error(error);
  }
};
//Get all Post using server actions
export const getAllPost=async()=>{
  await connectDb();
  try {
    const posts =await Post.find().sort({createdAt:-1}).populate({path:"comments",options:{sort:{createdAt:-1}}});
    // console.log(posts);
    if(!posts) return [];
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.log(error);
    
    
  }
}

//Delete post by ID
export const deletePostAction=async (postId:any)=>{
  await connectDb();
  const signedInUser=await currentUser();
  if(!signedInUser){
    throw new Error("User not authenticated.");
  }
  const post=await Post.findById(postId);
  if(!post) throw new Error("Post not found");

  //he will able to delete only his post
  if(post.user.userId !== signedInUser?.id){
    throw new Error("this is not your post")
  }
  try {
    await Post.deleteOne({_id:postId});
    revalidatePath("/");
    
  } catch (error:any) {
    throw new Error("error occured",error)
    
  }


}

//Create Comment
export const createCommentAction=async(postId:string,formData:FormData)=>{
  const signuser=await currentUser();
  // console.log(signuser);
  
  if(!signuser)throw new Error("User not authenticated");
  try {
    const inputText=formData.get("inputText") as string;
    if(!inputText)throw new Error("Comment is required");
    if(!postId)throw new Error("postId is required");

    const databaseUser: IUser = {
      firstName : signuser.firstName || "Nirmal",
      lastName : signuser?.lastName || "Patra",
      userId :signuser?.id,
      profilePhoto : signuser?.imageUrl,
    };
    const post=await Post.findById({_id:postId});
    if(!post)throw new Error("Post not found");
    const comment=await Comment.create({
      textMsg:inputText,
      user:databaseUser
    });
    // console.log(comment);
    
    const commentId:any=comment._id;
    post.comments?.push(commentId);

    await post.save();
    revalidatePath("/");
  } catch (error:any) {
    throw new Error("Error occured");
    // console.log(error);
    
    
  }
}