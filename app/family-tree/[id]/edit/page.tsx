"use client"
import React, { useEffect } from "react";
import { GitGraph } from "lucide-react";
import TreeComponent from "@/components/tree/Tree";
import FamilyTreeBuilder from "@/components/tree/FamilyTreeBuilder"
import FamilyTree from "@/lib/familytree";
import { useAuth } from "@clerk/nextjs";

const page = ({params}:{
  params: any
}) => {
  const {id} = params;
  const [tree, setTree] = React.useState<any>(null);
  const {userId} = useAuth()
  

  useEffect(() => {

    if(!userId){
      return;
    }
    fetch(`http://localhost:3000/api/trees/${id}`,{
      headers: {
        "user-id": userId || ""
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setTree(data);
    })
  },[userId])

  
  return (
    // <div className="h-[90dvh] pt-8">
    //   <div className="h-full grid grid-cols-12 gap-3 p-3">

    //     <aside className="col-span-3 bg-red-500 rounded-lg">
          
    //     </aside>

    //     <div className="col-span-9 flex flex-col gap-2 ">
    //         <div className="bg-pink-300 h-1/4 rounded-lg">

    //         </div>
    //         <div className="bg-blue-200 flex-1 rounded-lg">
    //           <TreeComponent />
    //         </div>
    //     </div>
    //   </div>
    // </div>

    <div>
      {
        tree ? (
          <FamilyTreeBuilder tree={tree} />
        ) : (
          <p>Loading...</p>
        )
      }
    </div>
  );
};

export default page;
