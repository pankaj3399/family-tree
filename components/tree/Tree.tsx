// import React, { useEffect, useRef, useState } from "react";
// import FamilyTree from "@balkangraph/familytree.js";
// import axios from "axios";
// import { promise } from "zod";

// const TreeComponent: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [familyTreeInstance, setFamilyTreeInstance] = useState<FamilyTree | null>(null);
//   const [nodes, setNodes] = useState<any[]>([
//     {
//       id: 1,
//       name: "Root Member",
//       gender: "male",
//       img: "https://cdn.balkan.app/shared/m30/5.jpg",
//       mid:2,
//       fid:1,
  
//     },
//   ]);

//   const [selectedNode, setSelectedNode] = useState<any | null>(null);


//   useEffect(() => {
//     if (containerRef.current) {
//       const newFamilyTree = new FamilyTree(containerRef.current, {
//         nodeBinding: {
//           field_0: "name",
//           img_0: "img",
//           field_1: "birthDate",
//         },
//         nodes,
//         editForm: {
//           generateElementsFromFields: false,
//         },

//         nodeMouseClick: (event: any, node: any) => {
//           if (node) {
//             setSelectedNode(node as Node);
//           }
//         }
//       });
//       setFamilyTreeInstance(newFamilyTree);

//       newFamilyTree.on("update", (sender: FamilyTree, args: any) => {

//         setNodes(args); 
        
//  });

//       return () => {
//         if (familyTreeInstance) {
//           familyTreeInstance.destroy(); 
//         }
//       };
//     }
//   }, [containerRef]);

//   const addFamilyMember = (relationship: string, gender: string) => {
//     const newId = nodes.length + 1;
//     const newNode: {
//       id: number;
//       name: string;
//       gender: string;
//       img: string;
//       mid?: number;
//       pids?: number[];
//     } = {
//       id: newId,
//       name: `New ${relationship}`,
//       gender,
//       img: gender === "male"
//         ? "https://cdn.balkan.app/shared/m10/2.jpg"
//         : "https://cdn.balkan.app/shared/w10/3.jpg",
//     };

//     if (selectedNode) {
//       if (relationship === "son" || relationship === "daughter") {
//         newNode.mid = selectedNode.id;
//       } else if (relationship === "husband" || relationship === "wife") {
//         newNode.pids = [selectedNode.id];
//       }
//     }

//     setNodes([...nodes, newNode]);
//   };

//   const handleImageUpload = async (file: File) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "typora_preset"); 
//     const response = await axios.post(
//       "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
//       formData
//     );
//     return response.data.secure_url;
//   };

//   const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0] && selectedNode) {
//       const imageUrl = await handleImageUpload(e.target.files[0]);
//       setNodes(
//         nodes.map((node) =>
//           node.id === selectedNode.id ? { ...node, img: imageUrl } : node
//         )
//       );
//     }
//   };

//   return (
//     <div className="flex flex-col gap-4">
//       <div
//         ref={containerRef}
//         style={{ width: "100%", height: "500px", borderRadius: "10px" }}
//       />
//       <div className="flex gap-2">
//         <button
//           onClick={() => addFamilyMember("son", "male")}
//           className="btn btn-primary"
//         >
//           Add Son
//         </button>
//         <button
//           onClick={() => addFamilyMember("daughter", "female")}
//           className="btn btn-primary"
//         >
//           Add Daughter
//         </button>
//         <button
//           onClick={() => addFamilyMember("husband", "male")}
//           className="btn btn-primary"
//         >
//           Add Husband
//         </button>
//         <button
//           onClick={() => addFamilyMember("wife", "female")}
//           className="btn btn-primary"
//         >
//           Add Wife
//         </button>
//       </div>
//       {selectedNode && (
//         <div>
//           <h3>Selected Member: {selectedNode.name}</h3>
//           <input type="file" onChange={onImageChange} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default TreeComponent;

import React, { useEffect, useRef, useState } from "react";
import FamilyTree from "@balkangraph/familytree.js";
import axios from "axios";
import { on } from "events";

interface Node{
  id: number;
  name: string;
  gender  : string;
  img : string;
  mid? : number;
  pids? : number[];
}

const TreeComponent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<any[]>([
    {
      id: 1,
      name: "Root Member",
      gender: "male",
      img: "https://cdn.balkan.app/shared/m30/5.jpg",
    },
  ]);
  const [selectedNode, setSelectedNode] = useState<any | null>(null);


  useEffect(() => {
    if (containerRef.current) {
      const familyTree = new FamilyTree(containerRef.current, {
        nodeBinding: {
          field_0: "name",
          img_0: "img",
        },
        nodes: nodes,
        editForm: {
          generateElementsFromFields: false,
        },
        nodeMouseClick: FamilyTree.action.edit
      });

      familyTree.onNodeClick((args: any) => {
        // console.log("hhh"+JSON.stringify(args.node));
        
        setSelectedNode(args.node);
        alert(args.node.name);
      });
      // return () => familyTree.destroy(); 
    }
  }, [nodes]);

  const addFamilyMember = (relationship: string, gender: string) => {
    if (!selectedNode) {
      alert("Please select a member to add a relationship.");
      return;
    }

    // if (relationship === "wife" ) {
    //   alert("A wife can only be added to a male member.");
    //   return;
    // }

    if (relationship === "husband" && selectedNode.gender !== "female") {
      alert("A husband can only be added to a female member.");
      return;
    }

  
    const newId = nodes.length + 1;
    
    
    const newNode: Node = {
      id: newId,
      name: `New ${relationship}`,
      gender,
      img:
        gender === "male"
          ? "https://cdn.balkan.app/shared/m10/2.jpg"
          : "https://cdn.balkan.app/shared/w10/3.jpg",
    };
  
    
    if (relationship === "son" || relationship === "daughter") {
      newNode.mid = selectedNode.id; 
      setNodes([...nodes, newNode, selectedNode]); 
    } else if (relationship === "husband" || relationship === "new wife") {
      newNode.pids = [selectedNode.id]; 
      setSelectedNode({
        ...selectedNode,
        pids: [newId]
      })
      const newNodes = nodes.map((node) => {
        if(node.id === selectedNode.id){
          return {
            ...node,
            pids: [newId]
          }
        }
        return node;
      })
      setNodes([...newNodes, newNode]);
    }
  };
  

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "typora_preset"); 
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dvsl1aslo/image/upload",
      formData
    );
    return response.data.secure_url;
  };

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && selectedNode) {
      const imageUrl = await handleImageUpload(e.target.files[0]);
      setNodes(
        nodes.map((node) =>
          node.id === selectedNode.id ? { ...node, img: imageUrl } : node
        )
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={containerRef}
        style={{ width: "100%", height: "500px", borderRadius: "10px" }}
      />
      <div className="flex gap-2">
        <button
          onClick={() => addFamilyMember("son", "male")}
          className="btn btn-primary"
        >
          Add Son
        </button>
        <button
          onClick={() => addFamilyMember("daughter", "female")}
          className="btn btn-primary"
        >
          Add Daughter
        </button>
        <button
          onClick={() => addFamilyMember("husband", "male")}
          className="btn btn-primary"
        >
          Add Husband
        </button>
        <button
          onClick={() => addFamilyMember("new wife", "female")}
          className="btn btn-primary"
        >
          Add Wife
        </button>
      </div>
      {selectedNode && (
        <div>
          <h3>Selected Member: {selectedNode.name}</h3>
          <input type="file" onChange={onImageChange} />
        </div>
      )}
    </div>
  );
};

export default TreeComponent;
