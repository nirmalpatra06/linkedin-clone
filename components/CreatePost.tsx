"use client";
import React, { useState } from "react";
import ProfileImage from "./shared/ProfileImage";
import { PostDialog } from "./PostDialog";

const CreatePost = ({ user }: { user: any }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  function handleDialogBox() {
    setOpenDialog(true);
  }
  return (
    <div className="bg-white p-4 m-2 md:m-0 border border-gray-300 rounded-lg">
      <div className="flex items-center gap-3">
        <ProfileImage src={user?.imageUrl} />
        {/* <Input
          onClick={handleDialogBox}
          type="text"
          placeholder="Start a post, try writing with AI"
          className="focus:outline-none focus:border-none p-4 border border-black rounded-full hover:bg-gray-100 cursor-pointer"
        /> */}
        <input
          onClick={handleDialogBox}
          type="text"
          placeholder="Start a post, try writing with AI"
          className="focus:outline-none w-full p-4 border border-black rounded-full"
        />
        <PostDialog
          user={user}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          src={user?.imageUrl}
        />
      </div>
    </div>
  );
};

export default CreatePost;
