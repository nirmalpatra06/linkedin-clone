import { IPostDocument } from "@/models/post.model";
import React from "react";
import Comment from "./Comment";

const Comments = ({ post }: { post: IPostDocument }) => {
  return (
    <div>
      {post.comments?.map((com: any) => (
        <Comment key={com?.user?.postId!} com={com} />
      ))}
    </div>
  );
};

export default Comments;
