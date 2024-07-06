import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
// interface Props {
//   src: string;
// }
// const ProfileImage: React.FC<Props> = ({ src }) => {
const ProfileImage = ({ src }: { src: string }) => {
  return (
    <div>
      <Avatar>
        <AvatarImage src={src} alt="banner" />
      </Avatar>
    </div>
  );
};

export default ProfileImage;
