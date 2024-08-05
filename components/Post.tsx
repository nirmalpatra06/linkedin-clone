"use client";
import React from "react";
import ProfileImage from "./shared/ProfileImage";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { IPostDocument } from "@/models/post.model";
import PostContent from "./PostContent";
import SocialOptions from "./SocialOptions";
import ReactTimeago from "react-timeago";
import { deletePostAction } from "@/lib/serveraction";

const Post = ({ post }: { post: IPostDocument }) => {
  // console.log(post);

  const user = useUser();
  // console.log(user);
  // console.log(post);

  const fullName = post.user.firstName + " " + post.user.lastName;
  const loggedInUser = user.user?.id === post?.user?.userId;
  return (
    <div className="bg-white m-2 rounded-md border-gray-300">
      <div className="flex gap-2 p-4">
        <ProfileImage src={post?.user?.profilePhoto!} />
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-sm font-bold">
              {fullName}
              <Badge variant={"secondary"} className="ml-1">
                You
              </Badge>
            </h1>
            <p className="text-xs text-gray-500">
              @{user ? user.user?.username : "username"}
            </p>
            <p className="text-xs text-gray-500">
              <ReactTimeago date={new Date(post.createdAt)} />
            </p>
          </div>
          {loggedInUser && (
            <Button
              onClick={() => {
                const res = deletePostAction(post._id);
              }}
              size={"icon"}
              variant={"outline"}
              className="rounded-full"
            >
              <Trash2 />
            </Button>
          )}
        </div>
      </div>
      <PostContent post={post} />
      <SocialOptions post={post} />
    </div>
  );
};

export default Post;
