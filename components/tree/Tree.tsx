import React, { useEffect, useRef } from "react";
import FamilyTree from "@balkangraph/familytree.js";
import { pid } from "process";

const TreeComponent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedUser, setSelectedUser] = React.useState<any>();
  

  useEffect(() => {
    if (containerRef.current) {
      const familyTree = new FamilyTree(containerRef.current, {
        nodeBinding: {
          field_0: "name",
          img_0: "img",
          field_1: "birthDate",
        },
        nodes: [
          {
            id: 1,
            pids: [2],
            name: "Amber McKenzie",
            gender: "female",
            img: "https://cdn.balkan.app/shared/2.jpg",
          },
          {
            id: 2,
            pids: [1],
            name: "Ava Field",
            gender: "male",
            img: "https://cdn.balkan.app/shared/m30/5.jpg",
          },
          {
            id: 3,
            mid: 1,
            fid: 2,
            name: "Peter Stevens",
            gender: "male",
            img: "https://cdn.balkan.app/shared/m10/2.jpg",
          },
          {
            id: 4,
            mid: 1,
            fid: 2,
            name: "Savin Stevens",
            gender: "male",
            img: "https://cdn.balkan.app/shared/m10/1.jpg",
          },
          {
            id: 5,
            mid: 1,
            fid: 2,
            name: "Emma Stevens",
            gender: "female",
            img: "https://cdn.balkan.app/shared/w10/3.jpg",
          },
        ],
        // nodes: nodes,
        
        
      });
    }
  }, []);

  useEffect(() => {
    if (selectedUser) {
      console.log("Selected User:", selectedUser);
    }
  }, [selectedUser]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "500px", borderRadius: "50px" }}
    />
  );
};

export default TreeComponent;
