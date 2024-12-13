import React from "react";
import { GitGraph } from "lucide-react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[90dvh]">
      <GitGraph size={96} />
      <h1 className="text-2xl font-semibold mt-8">
        This Page is Under Construction
      </h1>
    </div>
  );
};

export default page;
