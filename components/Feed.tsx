import React from "react";
import CreatePost from "./CreatePost";
import Posts from "./Posts";

const Feed = ({ user }: { user: any }) => {
  const userData = JSON.parse(JSON.stringify(user));
  return (
    <div className="flex-1 border border-black">
      {/* Create Post */}
      <CreatePost user={userData} />
      {/* Posts */}
      <Posts />
    </div>
  );
};

export default Feed;
