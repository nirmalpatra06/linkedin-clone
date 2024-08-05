import React from "react";
import {
  Bell,
  Home,
  BriefcaseBusiness,
  LucideMessageCircleMore,
  Users2Icon,
} from "lucide-react";
import Link from "next/link";
interface Props {
  src: string;
  icon: JSX.Element;
  text: string;
}
const navItems: Props[] = [
  {
    src: "/",
    icon: <Home />,
    text: "Home",
  },
  {
    src: "/network",
    icon: <Users2Icon />,
    text: "My Network",
  },
  {
    src: "/jobs",
    icon: <BriefcaseBusiness />,
    text: "Jobs",
  },
  {
    src: "/message",
    icon: <LucideMessageCircleMore />,
    text: "Messaging",
  },
  {
    src: "/notifiactions",
    icon: <Bell />,
    text: "Notifications",
  },
];
const NavItems = () => {
  return (
    <div className="flex gap-6">
      {navItems.map((item, idx) => (
        <Link
          href={item.src}
          key={idx}
          className="flex flex-col items-center text-gray-500 cursor-pointer hover:text-black text-xs"
        >
          <span>{item.icon}</span>
          <span className="hidden md:block">{item.text}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavItems;
