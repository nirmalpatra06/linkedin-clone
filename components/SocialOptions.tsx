import React, { useState } from "react";
import { Button } from "./ui/button";
import { MessageCircleMore, Repeat, Send, ThumbsUp } from "lucide-react";
import { IPostDocument } from "@/models/post.model";
import { useUser } from "@clerk/nextjs";
import CommentInput from "./CommentInput";
import Comments from "./Comments";

const SocialOptions = (post: { post: IPostDocument }) => {
  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.post.likes);
  const [commentOpen, setCommentOpen] = useState(false);
  const likeOrDislikeHandler = async () => {
    if (!user) throw new Error("User not authenticated.");
    const tempLiked = liked;
    const tempLikes = likes;
    const like = [...(likes ?? []), user.id];
    const disLike = likes?.filter((userId) => userId !== user.id);
    const newLike = liked ? disLike : like;

    setLiked(!liked);
    setLikes(newLike);
    const res = await fetch(
      `/api/posts/${post.post._id}/${liked ? "dislike" : "like"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user.id),
      }
    );
    if (!res.ok) {
      setLiked(tempLiked);
      throw new Error("Failed to like or dislike");
    }
    const fetchAllLikes = await fetch(`/api/posts/${post.post._id}/like`);
    if (!fetchAllLikes.ok) {
      setLikes(tempLikes);
      throw new Error("Failed to fetch like");
    }
    const likeData = await fetchAllLikes.json();
    setLikes(likeData);
  };
  const postId: any = post.post._id;
  return (
    <div>
      <div className="text-sm mx-2 p-2 flex items-center justify-between">
        {likes && likes.length > 0 && (
          <p className="text-xs text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer">
            {likes.length} likes
          </p>
        )}
        {post.post.comments && post.post.comments.length > 0 && (
          <p
            onClick={() => setCommentOpen(!commentOpen)}
            className="text-xs text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer"
          >
            {post.post.comments.length} comments
          </p>
        )}
      </div>
      <div className="flex justify-around items-center pb-2">
        <Button
          onClick={likeOrDislikeHandler}
          variant={"ghost"}
          className="flex items-center gap-1 rounded-lg text-gray-600 hover:text-black"
        >
          <ThumbsUp className={`${liked && "fill-[#378FE9]"}`} />
          <p className={`${liked && "text-[#378FE9]"}`}>Like</p>
        </Button>
        <Button
          onClick={() => setCommentOpen(!commentOpen)}
          variant={"ghost"}
          className="flex items-center gap-1 rounded-lg text-gray-600 hover:text-black"
        >
          <MessageCircleMore />
          <p>Comment</p>
        </Button>
        <Button
          variant={"ghost"}
          className="flex items-center gap-1 rounded-lg text-gray-600 hover:text-black"
        >
          <Repeat />
          <p>Repost</p>
        </Button>
        <Button
          variant={"ghost"}
          className="flex items-center gap-1 rounded-lg text-gray-600 hover:text-black"
        >
          <Send />
          <p>Send</p>
        </Button>
      </div>
      {commentOpen && (
        <div className="p-4">
          <CommentInput postId={postId} />
          <Comments post={post.post} />
        </div>
      )}
    </div>
  );
};

export default SocialOptions;
