import Image from "next/image";
import React from "react";
import ProfileImage from "./shared/ProfileImage";
import { SaveIcon } from "lucide-react";

const Profile = ({ user }: { user: any }) => {
  return (
    <div className="bg-white hidden md:block w-[20%] h-fit border border-r-gray-300 rounded-lg">
      <div className="flex relative flex-col items-center">
        <div className="w-full h-16 overflow-hidden">
          {user && (
            <Image
              src={"/banner.webp"}
              alt="Banner"
              width={200}
              height={200}
              className="w-full h-full rounded-t-md"
            />
          )}
        </div>
        <div className="my-1 absolute top-10">
          <ProfileImage src={user ? user?.imageUrl : "/banner.webp"} />
        </div>
        <div className="p-2 mt-5 text-center border-b w-full">
          <h1 className="font-bold hover:underline cursor-pointer">
            {user ? `${user?.firstName} ${user?.lastName}` : "Nirmal Patra"}
          </h1>
          <p className="text-xs">@{user ? `${user?.username}` : "username"}</p>
        </div>
        <div className="w-full">
          <div className="w-full cursor-pointer text-xs font-bold text-gray-500 mt-2 px-3 py-2 flex justify-between hover:bg-gray-200">
            <span>profile viewers</span>
            <span className="text-blue-500">98</span>
          </div>
          <div className="w-full border-b border-r-gray-300 cursor-pointer font-bold  hover:bg-gray-200 mb-2 px-3 py-2 text-xs flex">
            <div className="w-full flex flex-col">
              <span className="text-gray-500">Connections</span>
              <span className="text-black">Connet with alumni</span>
            </div>
            <span className="text-blue-500">131</span>
          </div>
          <div className="w-full text-xs">
            <div className="flex flex-col p-4 border-b border-r-gray-300 group hover:bg-gray-200">
              <span className="text-gray-500">
                Job search smarter with Premium
              </span>
              <span className="text-black group-hover:text-blue-500 ">
                Try for ₹0
              </span>
            </div>
            <div className="flex justify-start gap-2 font-bold text-gray-500 p-4 hover:bg-gray-200">
              <SaveIcon width={15} height={15} />
              <span>Saved items</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
