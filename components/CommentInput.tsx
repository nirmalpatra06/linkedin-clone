"use client";
import React from "react";
import ProfileImage from "./shared/ProfileImage";
import { useUser } from "@clerk/nextjs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createCommentAction } from "@/lib/serveraction";

const CommentInput = ({ postId }: { postId: string }) => {
  const user = useUser();
  const commentActionHandler = async (formData: FormData) => {
    try {
      if (!user) {
        throw new Error("User not authenticated");
      }

      await createCommentAction(postId, formData);
    } catch (error: any) {
      throw new Error("Error occured", error);
      // console.log(error);
    }
  };
  return (
    <form action={(formData) => commentActionHandler(formData)}>
      <div className="flex items-center gap-2">
        <ProfileImage src={user.user?.imageUrl!} />
        <Input
          type="text"
          name="inputText"
          // value={text}
          placeholder="Add a comment"
          className="rounded-full bg-gray-50 focus:outline-none py-1"
        />
        <Button type="submit" variant={"outline"} className="rounded-full">
          Add
        </Button>
      </div>
    </form>
  );
};

export default CommentInput;
