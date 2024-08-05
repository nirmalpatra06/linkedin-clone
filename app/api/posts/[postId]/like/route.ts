import connectDb from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";


//Get likes
export const GET=async (req:NextRequest,{params}:{params:{postId:string}})=>{
    try {
        await connectDb();
        const post=await Post.findById({_id:params.postId})
        if(!post) return  NextResponse.json("Post not found");
        return NextResponse.json(post.likes)
    } catch (error:any) {
        return NextResponse.json("error occured",error);
    }

}

//post likes
export const POST=async (req:NextRequest,{params}:{params:{postId:string}})=>{
    try {
        await connectDb();
        const userId=await req.json();
        const post=await Post.findById({_id:params.postId});
        if(!post) return  NextResponse.json("Post not found");

        await post.updateOne({$addToSet:{likes:userId}})
        return NextResponse.json({Message:"Post liked successsfully"})
    } catch (error:any) {
        return NextResponse.json("Error occured",error)
        
    }
}