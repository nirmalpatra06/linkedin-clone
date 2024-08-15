import Feed from "@/components/Feed";
import News from "@/components/News";
import Profile from "@/components/Profile";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  // console.log(user);

  return (
    <div className="mt-20">
      <div className="min-w-full bg-[#f4f2ee] mx-auto flex justify-between gap-8">
        {/* Profile */}
        <Profile user={user} />
        {/* Feed */}
        <Feed user={user} />
        {/* News */}
        <News />
      </div>
    </div>
  );
}
