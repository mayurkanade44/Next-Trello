import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const textFont = Poppins({
  subsets: ["latin-ext"],
  weight: ["100", "200", "300", "400", "500"],
});

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <div className="flex items-center mb-4 border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          No 1 Task Management
        </div>
        <h1 className="text-3xl md:text-6xl text-center mb-6">
          Taskify Helps Team Move
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white px-4 p-2 rounded-lg">
          Work Forward
        </div>
      </div>
      <div
        className={cn(
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-sm md:max-w-2xl text-center mx-auto",
          textFont.className
        )}
      >
        Collaborate, manage projects and reach new productivity peaks. From high
        rise to home office, the way your team works is unique all with Taskify
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">Get Taskify For Free</Link>
      </Button>
    </div>
  );
};
export default MarketingPage;
