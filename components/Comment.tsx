import { ICommentDocument } from "@/models/comment.model";
import React from "react";
import ProfileImage from "./shared/ProfileImage";
import ReactTimeago from "react-timeago";

const Comment = ({ com }: { com: ICommentDocument }) => {
  // console.log(com);

  return (
    <div className="flex gap-2 my-4">
      <div className="mt-2">
        <ProfileImage src={com?.user?.profilePhoto!} />
      </div>
      <div className="flex flex-1 justify-between p-3 bg-[#f2f2f2]">
        <div>
          <h1 className="text-sm font-medium">{`${com?.user?.firstName} ${com?.user?.lastName}`}</h1>
          <p className="text-xs text-gray-500">
            @{com?.user?.firstName.toLowerCase()}
            {com?.user?.lastName.toLowerCase()}
          </p>
          <p className="my-2">{com?.textMsg!}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">
            <ReactTimeago date={new Date(com.createdAt)} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
