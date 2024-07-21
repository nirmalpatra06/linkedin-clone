import React from "react";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
import { getAllPost } from "@/lib/serveraction";

const Feed = async ({ user }: { user: any }) => {
  const userData = JSON.parse(JSON.stringify(user));
  const posts = await getAllPost();
  // console.log(posts);

  return (
    <div className="flex-1 border border-black">
      {/* Create Post */}
      <CreatePost user={userData} />
      {/* Posts */}
      <Posts posts={posts} />
    </div>
  );
};

export default Feed;
