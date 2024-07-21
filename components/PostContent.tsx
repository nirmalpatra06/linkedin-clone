import { IPostDocument } from "@/models/post.model";
import Image from "next/image";
import React from "react";

const PostContent = ({ post }: { post: IPostDocument }) => {
  return (
    <div className="my-3">
      <p className="my-2 px-4">{post?.description}</p>
      {post?.imageUrl && (
        <Image
          alt="postImage"
          src={post?.imageUrl}
          width={500}
          height={500}
          className="w-full mx-auto"
        />
      )}
    </div>
  );
};

export default PostContent;
