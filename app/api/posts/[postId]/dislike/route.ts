import connectDb from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

export const POST=async (req:NextRequest,{params}:{params:{postId:string}})=>{
    try {
        await connectDb();
        const userId=await req.json();
        const post=await Post.findById({_id:params.postId});
        if(!post) return  NextResponse.json("Post not found");

        await post.updateOne({$pull:{likes:userId}})
        return NextResponse.json({Message:"Post disliked successsfully"})
    } catch (error:any) {
        return NextResponse.json("Error occured",error)
        
    }
}