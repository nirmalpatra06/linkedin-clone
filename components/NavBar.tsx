import Image from "next/image";
import React from "react";
import SearchInput from "./SearchInput";
import NavItems from "./NavItems";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const NavBar = () => {
  return (
    <nav className="fixed w-full px-4 bg-white z-10 shadow-sm">
      <div className="max-w-6xl flex items-center justify-between h-14 mx-auto">
        <div className="flex justify-between gap-2">
          <Image src={`/logo.webp`} alt="Logo" width={35} height={35} />
          <SearchInput />
        </div>
        <div className="flex items-center gap-2">
          <div className="">
            <NavItems />
          </div>
          <div>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Button className="bg-gray-300 text-black">
                <SignInButton />
              </Button>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
