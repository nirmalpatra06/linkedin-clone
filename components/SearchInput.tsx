import React from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center text-xs text-gray-500 cursor-pointer hover:text-black lg:hidden">
        <SearchIcon />
        <span className="hidden md:block">Search</span>
      </div>
      <Input
        className="w-[280px] hidden lg:block h-full outline-none bg-gray-100 rounded text-black"
        type="text"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchInput;
