// services/treeService.ts
"use server"
import { useAuth } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";


export interface FamilyTree {
  _id: string;
  name: string;
  createdAt: string;
  memberCount: number;
  lastModified: string;
  template: string;
}

// const  {userId}  = useAuth();
// console.log(userId);


  const BASE_URL = "";



  export   async function fetchTrees(): Promise<FamilyTree[]> {
    const {userId} = await auth()
    console.log("SERVER: "+userId);
    const response = await fetch(`${BASE_URL}/api/trees`, {
      headers: { "user-id": userId || "" },
    });
    if (!response.ok) throw new Error("Failed to fetch trees");
    return response.json();
  }

  export   async function deleteTree(id: string): Promise<void> {
    const {userId} = await auth()
    console.log("SERVER: "+userId);
    const response = await fetch(`${BASE_URL}/api/trees/${id}`, {
      method: "DELETE",
      headers: { "user-id": userId || "" },
    });
    if (!response.ok) throw new Error("Failed to delete tree");
  }

  export   async function createTree(name?: string): Promise<FamilyTree> {
    console.log("Tree");
    
    const {userId} = await auth()
    // console.log("SERVER: "+sessionId);
    const response = await fetch(`/api/trees`, {
      method: "POST",
      headers: { "user-id":userId || "" , "Content-Type": "application/json" },
      body: JSON.stringify({ name, members:[
        {
              id: 1,
              firstName: "John",
              lastName: "Doe",
              gender: "male",
              alive: true,
              birthDate: "1980-01-01",
              profileImage: "",
            }
      ]
       }),
    });
    if (!response.ok) throw new Error("Failed to create tree");
    return response.json();
  }

  export   async function exportTree(id: string): Promise<FamilyTree> {
    const {userId} = await auth()
    console.log("SERVER: "+userId);
    const response = await fetch(`${BASE_URL}/api/trees/${id}`, {
      headers: { "user-id": userId || "" },
    });
    if (!response.ok) throw new Error("Failed to export tree");
    return response.json();
  }

  export async   function generateExportFile(tree: FamilyTree): Promise<void> {
    const blob = new Blob([JSON.stringify(tree, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tree.name.toLowerCase().replace(/\s+/g, "-")}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};
