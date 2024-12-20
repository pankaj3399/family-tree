
import React, { useEffect, useRef, useState } from "react";
import FamilyTree from "@balkangraph/familytree.js";
import axios from "axios";
import { AddMemberModal } from "./AddMemberModal";
import { SettingsPanel } from "./SettingsPanel";
import { MemberEditPanel } from "./MemberEditPanel";
import { TREE_TEMPLATES, DEFAULT_AVATARS } from "@/utils/constants";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";

interface FamilyMember {
  id: number;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  alive: boolean;
  birthDate: string;
  deathDate?: string;
  profileImage: string;
  img?:string;
  mid?: number; 
  fid?: number; 
  pids?: number[]; 
}

interface Settings {
  showBirthDates: boolean;
  showDeathDates: boolean;
  maleColor: string;
  femaleColor: string;
  backgroundColor: string;
  orientation: string;
  template: string;
  maxMembers: number;
  zoom:number
}

const FamilyTreeBuilder = ({tree, id}:{
  tree:any,
  id:string
}) => {
  const treeContainerRef = useRef<HTMLDivElement>(null);
  const {userId} = useAuth()
  const [members, setMembers] = useState<FamilyMember[]>([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      gender: "male",
      alive: true,
      birthDate: "1980-01-01",
      profileImage: DEFAULT_AVATARS.male,
    }
  ]);

  const [treeData, setTreeData] = useState<any>();

  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);


  const [treeSettings, setTreeSettings] = useState<Settings>({
    showBirthDates: true,
    showDeathDates: true,
    maleColor: "#4A90E2",
    femaleColor: "#F5A623",
    backgroundColor: "#F5F5F5",
    orientation: "dark",
    template: "hugo",
    maxMembers: 50, 
    zoom:0.7
  });

  const [autoSaveStatus, setAutoSaveStatus] = useState<string>('');

  
  const handleImageUpload = async (file: File): Promise<string | null> => {
    if (!file) return null;
    

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Supported formats: JPEG, PNG, JPG");
      return null;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Max upload size is 5MB. Please compress your image.");
      return null;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "typora_preset");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dvsl1aslo/image/upload`,
        formData
      );

      return response.data.secure_url;
    } catch (error) {
      console.error("Image upload failed", error);
      alert("Image upload failed. Please try again.");
      return null;
    }
  };

  
  const saveTreeToBackend = async () => {
    try {
      if(!tree) return
      const response = await axios.post('/api/saveTree', {
        name: tree.name || "Untitled Tree",
        members: members.map(member => ({
          ...member,
          img: member.img
        })),
        template: treeSettings.template,
      });

      if (response.data.success) {
        setAutoSaveStatus('Saved successfully!');
        setTimeout(() => setAutoSaveStatus(''), 3000);
      } else {
        setAutoSaveStatus('Failed to save.');
      }
    } catch (error) {
      console.error("Save failed", error);
      setAutoSaveStatus('Error saving data.');
    }
  };

  // useEffect(()=>{
  //   if(!tree) return;    
  //   console.log(tree);
    
  //   setMembers(tree.members)
  // },[tree])

  useEffect(()=>{
    const fetchTree = async () => {
      if(!userId) return
      try{
        const res = await fetch(`http://localhost:3001/api/trees/${id}`,{
          headers:{
              "user-id":userId ?? ""
          }
        })
        const data = await res.json()
        console.log(JSON.stringify(data));
        
        setTreeData(data)
      }catch(err){
        console.log(err);
      }
    }
    fetchTree()
  },[userId])

  useEffect(()=>{
    if(!treeData) return;
    setMembers(treeData.members)
  },[treeData])

  // Auto-save functionality
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     saveTreeToBackend();
  //   }, 5000); // Auto-save every 5 seconds

  //   return () => clearTimeout(timer);
  // }, [members, treeSettings]);

  // Family Tree Initialization
  useEffect(() => {
    if (treeContainerRef.current) {
      const familyTree = new FamilyTree(treeContainerRef.current, {
        nodes: members.map(member => ({
          id: member.id,
          name: `${member.firstName} ${member.lastName}`,
          gender: member.gender,
          img: member.img,
          mid: member.mid,
          fid: member.fid,
          pids: member.pids,
          birthDate: member.birthDate,
          deathDate: member.deathDate,
        })),
        template: treeSettings.template,
        mode: "dark",
        nodeBinding: {
          field_0: "name",
          img_0: "img",
          field_1: treeSettings.showBirthDates ? "birthDate":"",
          field_2: treeSettings.showDeathDates ? "deathDate":"",
        },
        zoom: {
          speed: 50,
          smooth: 10,
        },
        nodeMouseClick: FamilyTree.action.none,
        tags: {
          male: { template: 'maleTemplate' },
          female: { template: 'femaleTemplate' },
        },
        nodeMenu: {
          add: { text: "Add Member" },
          remove: { text: "Remove Member" },
          save: { text: "Save Tree" },
        },
        scaleMax:2,
        scaleMin:0.2,     
        scaleInitial:treeSettings.zoom,
        menu:{
          svg: { text: "Export SVG" },
          csv: { text: "Export CSV" },
        },
        toolbar:{
          zoom:true,
          fit:true
        }
      });

      // Define templates for gender-based color coding
// Define base template for rectangular nodes
FamilyTree.templates.base = Object.assign({}, FamilyTree.templates.base, {
  node: `<rect x="0" y="0" width="200" height="100" fill=${treeSettings.backgroundColor} stroke-width="1" stroke="#CCCCCC" rx="10" ry="10"></rect>`,
  field_0: `<text x="5" y="25" style="font-size: 16px; font-weight: bold;" fill="#333">{val}</text>`,
  field_1: `<text x="5" y="45" style="font-size: 12px;" fill="#666">{val}</text>`,
  field_2: `<text x="5" y="60" style="font-size: 12px;" fill="#666">{val}</text>`,
  img_0: `
<defs>
  <clipPath id="clip-circle">
    <circle cx="190" cy="15" r="35"></circle>
  </clipPath>
</defs>
<circle cx="190" cy="15" r="40" fill="white"></circle>
<image x="150" y="-25" width="80" height="80" href="{val}" clip-path="url(#clip-circle)" preserveAspectRatio="xMidYMid slice"></image>
`,


});

FamilyTree.templates.maleTemplate = Object.assign({}, FamilyTree.templates.base, {
  node: `<rect x="0" y="0" width="200" height="100" fill=${treeSettings.maleColor} stroke-width="1" stroke="#CCCCCC" rx="10" ry="10"></rect>`,
  field_0: `<text x="5" y="25" style="font-size: 16px;" fill="#ffffff">{val}</text>`,
  field_1: `<text x="5" y="45" style="font-size: 12px;" fill="#ffffff">{val}</text>`,
  field_2: `<text x="5" y="60" style="font-size: 12px;" fill="#ffffff">{val}</text>`,
});

FamilyTree.templates.femaleTemplate = Object.assign({}, FamilyTree.templates.base, {
  node: `<rect x="0" y="0" width="200" height="100" fill=${treeSettings.femaleColor} stroke-width="1" stroke="#CCCCCC" rx="10" ry="10"></rect>`,
  field_0: `<text x="5" y="25" style="font-size: 16px;" fill="#ffffff">{val}</text>`,
  field_1: `<text x="5" y="45" style="font-size: 12px;" fill="#ffffff">{val}</text>`,
  field_2: `<text x="5" y="60" style="font-size: 12px;" fill="#ffffff">{val}</text>`,
});

FamilyTree.templates.male = FamilyTree.templates.maleTemplate;
FamilyTree.templates.female = FamilyTree.templates.femaleTemplate;


// Example family data
let familyData = [
  { id: 1, pids: [2], name: "John Doe", birthDate: "1980", deathDate: "", gender: "male", template: "male" },
  { id: 2, pids: [1], name: "Jane Doe", birthDate: "1982", deathDate: "", gender: "female", template: "female" },
];

      // Background color
      // familyTree.style.backgroundColor = treeSettings.backgroundColor;

      // Event Listener for Node Click
      familyTree.onNodeClick((args: any) => {
        const clickedMember = members.find(m => m.id === args.node.id);
        setSelectedMember(clickedMember || null);
      });

    //   return () => familyTree.destroy();
    }
  }, [members, treeSettings]);

  // Add Family Member Logic
  const addFamilyMember = (relationship: string, gender: 'male' | 'female') => {
    if (!selectedMember) {
      alert("Please select a member to add a relationship.");
      return;
    }

    if (members.length >= treeSettings.maxMembers) {
      alert(`Maximum member limit (${treeSettings.maxMembers}) reached.`);
      return;
    }

    const newId = Number(members[members.length - 1].id) + 1;
    const newMember: FamilyMember = {
      id: newId,
      firstName: `New ${relationship} ${newId}`,
      lastName: selectedMember.lastName,
      gender,
      alive: true,
      birthDate: new Date().toISOString().split('T')[0],
      profileImage: gender === 'male' ? DEFAULT_AVATARS.male : DEFAULT_AVATARS.female,
      img: gender === 'male' ? DEFAULT_AVATARS.male : DEFAULT_AVATARS.female,
    };

    // Set appropriate relationships
    switch (relationship) {
      case 'son':
      case 'daughter':
        if (selectedMember.gender === 'female') {
          newMember.mid = selectedMember.id;
        } else if (selectedMember.gender === 'male') {
          newMember.fid = selectedMember.id;
        }
        break;
      case 'husband':
      case 'wife':
        newMember.pids = [selectedMember.id];
        selectedMember.pids = [...selectedMember.pids ?? [], newMember.id]
        break;
      case 'father':
      case 'mother':
        if (relationship === 'father') {
          newMember.fid = selectedMember.id;
        } else {
          newMember.mid = selectedMember.id;
        }
        break;
    }

    setMembers([...members, newMember]);
    setSelectedMember(newMember);
  };

  // Update Member Information
  const updateMemberInfo = (updatedMember: FamilyMember) => {
    console.log("Updated:"+JSON.stringify(updatedMember));
    
    setMembers(members.map(m => m.id === updatedMember.id ? updatedMember : m));
    setSelectedMember(updatedMember);
  };

  // Delete Member
  const deleteMember = (memberId: number) => {
    if (confirm("Are you sure you want to delete this member?")) {
      setMembers(members.filter(m => m.id !== memberId));
      setSelectedMember(null);
    }
  };

  return(
  <div className="h-[100vh]  flex overflow-hidden ">

    <div className="">
     <aside className="w-[25vw] p-4 bg-background border-r ">
       <MemberEditPanel 
         member={selectedMember}
         onUpdateMember={updateMemberInfo}
         onDeleteMember={deleteMember}
         onImageUpload={handleImageUpload}
       />
     </aside>
    </div>
    <div>
      <div>
          {/* Settings Panel at the top */}
          <div className="p-2 bg-background border-b">
            <SettingsPanel 
              tree={treeData}
              settings={treeSettings}
              onSettingsChange={(updatedSettings) => setTreeSettings(updatedSettings)}
            />
          </div>
      </div>
      <div className="">
        <div className=" h-full">
        <main className="flex-1 p-4 relative  ">
        <div ref={treeContainerRef} className="w-full max-h-[60vh]  bg-red-800" />
                {autoSaveStatus && (
                  <div className="absolute top-4 left-4 bg-yellow-200 text-yellow-800 p-2 rounded shadow">
                    {autoSaveStatus}
                  </div>
                )}
        </main>
        </div>  
      </div>    
          <div className=" w-full">
              <AddMemberModal 
              isOpen={addMemberModalOpen}
              onClose={() => setAddMemberModalOpen(false)}
              onAddMember={addFamilyMember}
            />  
          </div>
            <div className="flex items-center justify-center gap-10 ">
              <Button
                onClick={() => setAddMemberModalOpen(true)}
                className=""
              >
                + Add
              </Button>
              <Button
                onClick={saveTreeToBackend}
                className=""
                variant="outline"
              >
                Save
              </Button>
            </div>
    </div>

    
  </div> 
  
  )

}

export default FamilyTreeBuilder


// return (
    




  //   <AddMemberModal 
  //     isOpen={addMemberModalOpen}
  //     onClose={() => setAddMemberModalOpen(false)}
  //     onAddMember={addFamilyMember}
  //   />
  // </div> */}
  
// )
