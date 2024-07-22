import { InfoIcon } from "lucide-react";
import React from "react";
interface NewsItems {
  heading: string;
  subHeading: string;
}
const newsItems: NewsItems[] = [
  {
    heading: "Smaller cities turn jobs hubs",
    subHeading: "2d ago",
  },
  {
    heading: "Global IT outage hits businesses",
    subHeading: "1d ago",
  },
  {
    heading: "Audit firms boost partner hiring",
    subHeading: "4d ago",
  },
  {
    heading: "Banks hikes lending rates ",
    subHeading: "2d ago",
  },
  {
    heading: "Aviation jobs to take off",
    subHeading: "2d ago",
  },
];
const News = () => {
  return (
    <div className="hidden md:block w-[25%] bg-white h-fit rounded-md border-gray-300">
      <div className="flex flex-col items-start justify-between p-3">
        <div className="flex justify-between w-full">
          <h1 className="text-2xl">LinkedIn News</h1>
          <InfoIcon size={15} className="hover:cursor-pointer" />
        </div>
        <p className="text-gray-500">Top stories</p>
      </div>
      <div>
        {newsItems.map(({ heading, subHeading }, idx) => (
          <div
            key={idx}
            className="flex flex-col items-start justify-between py-1 px-3 hover:cursor-pointer hover:bg-gray-200"
          >
            <h1>{heading}</h1>
            <p className="text-gray-500 text-xs">{subHeading}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
