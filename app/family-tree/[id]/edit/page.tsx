"use client"
import React from "react";
import { GitGraph } from "lucide-react";
import TreeComponent from "@/components/tree/Tree";

const page = () => {

  return (
    <div className="h-[90dvh] pt-8">
      <div className="h-full grid grid-cols-12 gap-3 p-3">

        <aside className="col-span-3 bg-red-500 rounded-lg">
          
        </aside>

        <div className="col-span-9 flex flex-col gap-2 ">
            <div className="bg-pink-300 h-1/4 rounded-lg">

            </div>
            <div className="bg-blue-200 flex-1 rounded-lg">
              <TreeComponent />
            </div>
        </div>
      </div>
    </div>
  );
};

export default page;
