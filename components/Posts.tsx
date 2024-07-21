import React from "react";
import Post from "./Post";
import { IPostDocument } from "@/models/post.model";

const Posts = ({ posts }: { posts: IPostDocument[] }) => {
  // console.log(posts);

  return (
    <div>
      {posts.map((post) => {
        const id: any = post._id;

        return <Post key={id} post={post} />;
      })}
    </div>
  );
};

export default Posts;
