// // app/components/MemberEditPanel.tsx
// import React, { useState } from 'react';
// import FamilyTree from '@balkangraph/familytree.js';

// interface FamilyMember {
//   id: number;
//   firstName: string;
//   lastName: string;
//   gender: 'male' | 'female';
//   alive: boolean;
//   birthDate: string;
//   deathDate?: string;
//   profileImage: string;
// }

// interface MemberEditPanelProps {
//   member: FamilyMember | null;
//   onUpdateMember: (member: FamilyMember) => void;
//   onDeleteMember: (memberId: number) => void;
//   onImageUpload: (file: File) => Promise<string | null>;
// }

// export const MemberEditPanel: React.FC<MemberEditPanelProps> = ({ 
//   member, 
//   onUpdateMember, 
//   onDeleteMember,
//   onImageUpload 
// }) => {
//   if (!member) return (
//     <div className="w-1/4 p-4 bg-white border-r">
//       <p className="text-gray-500">Select a member to edit</p>
//     </div>
//   );

//   const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const uploadedImageUrl = await onImageUpload(file);
//       if (uploadedImageUrl) {
//         onUpdateMember({ ...member, profileImage: uploadedImageUrl });
//       }
//     }
//   };

//   return (
//     <div className="w-1/4 p-4 bg-white border-r space-y-4 text-black">
//       <h2 className="text-xl font-bold mb-4">Member Details</h2>
      
//       <div className="flex flex-col items-center mb-4">
//         <img 
//           src={member.profileImage} 
//           alt={`${member.firstName} ${member.lastName}`} 
//           className="w-32 h-32 rounded-full object-cover mb-2"
//         />
//         <input 
//           type="file" 
//           accept="image/jpeg,image/png,image/jpg"
//           onChange={handleImageChange}
//           className="text-sm"
//         />
//       </div>

//       <div className="space-y-2">
//         <input
//           type="text"
//           placeholder="First Name"
//           value={member.firstName}
//           onChange={(e) => onUpdateMember({ ...member, firstName: e.target.value })}
//           className="w-full p-2 border bg-yellow-50 rounded placeholder:text-white"
//         />
//         <input
//           type="text"
//           placeholder="Last Name"
//           value={member.lastName}
//           onChange={(e) => onUpdateMember({ ...member, lastName: e.target.value })}
//           className="w-full p-2 border rounded bg-yellow-50 placeholder:text-white"
//         />

//         <div className="flex items-center space-x-2">
//           <label>Gender:</label>
//           <select
//             value={member.gender}
//             onChange={(e) => onUpdateMember({ ...member, gender: e.target.value as 'male' | 'female' })}
//             className="w-full p-2 border rounded bg-yellow-50"
//           >
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//           </select>
//         </div>

//         <div className="flex items-center space-x-2">
//           <label>Alive:</label>
//           <input
//             type="checkbox"
//             checked={member.alive}
//             onChange={(e) => onUpdateMember({ 
//               ...member, 
//               alive: e.target.checked,
//               deathDate: e.target.checked ? undefined : member.deathDate
              
//             })}
//           />
//         </div>

//         <input
//           type="date"
//           value={member.birthDate}
//           onChange={(e) => onUpdateMember({ ...member, birthDate: e.target.value })}
//           className="w-full p-2 border rounded bg-yellow-50"
//         />

//         {!member.alive && (
//           <input
//             type="date"
//             value={member.deathDate || ''}
//             onChange={(e) => onUpdateMember({ ...member, deathDate: e.target.value })}
//             placeholder="Death Date"
//             className="w-full p-2 border rounded"
//           />
//         )}

//         <button
//           onClick={() => onDeleteMember(member.id)}
//           className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
//         >
//           Delete Member
//         </button>
//       </div>
//     </div>
//   );
// };

'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CalendarIcon, Trash2Icon, UploadIcon } from 'lucide-react'

interface FamilyMember {
  id: number
  firstName: string
  lastName: string
  gender: 'male' | 'female'
  alive: boolean
  birthDate: string
  deathDate?: string
  profileImage: string,
  img?:string
}

interface MemberEditPanelProps {
  member: FamilyMember | null
  onUpdateMember: (member: FamilyMember) => void
  onDeleteMember: (memberId: number) => void
  onImageUpload: (file: File) => Promise<string | null>
}

export const MemberEditPanel: React.FC<MemberEditPanelProps> = ({ 
  member, 
  onUpdateMember, 
  onDeleteMember,
  onImageUpload 
}) => {
  if (!member) return null

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const uploadedImageUrl = await onImageUpload(file)
      if (uploadedImageUrl) {
        onUpdateMember({ ...member, profileImage: uploadedImageUrl, img:uploadedImageUrl })
      }
    }
  }

  return (
    <Card className="relative top-4 w-[calc(100%-2rem)] sm:w-80">
    <CardHeader />
    <CardContent className="space-y-2">
      <div className="flex flex-col items-center space-y-1">
        <Avatar className="w-20 h-20">
          <AvatarImage src={member.img} alt={`${member.firstName} ${member.lastName}`} />
          <AvatarFallback>{member.firstName[0]}{member.lastName[0]}</AvatarFallback>
        </Avatar>
        <Label htmlFor="image-upload" className="cursor-pointer">
          <Input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <UploadIcon size={14} />
            <span>Upload</span>
          </div>
        </Label>
      </div>
  
      <div className="space-y-1">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          value={member.firstName}
          onChange={(e) => onUpdateMember({ ...member, firstName: e.target.value })}
        />
      </div>
  
      <div className="space-y-1">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          value={member.lastName}
          onChange={(e) => onUpdateMember({ ...member, lastName: e.target.value })}
        />
      </div>
  
      <div className="space-y-1">
        <Label htmlFor="gender">Gender</Label>
        <Select
          value={member.gender}
          onValueChange={(value) => onUpdateMember({ ...member, gender: value as 'male' | 'female' })}
        >
          <SelectTrigger id="gender">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>
  
      <div className="flex items-center space-x-1">
        <Switch
          id="alive"
          checked={member.alive}
          onCheckedChange={(checked) => onUpdateMember({ 
            ...member, 
            alive: checked,
            deathDate: checked ? undefined : member.deathDate
          })}
        />
        <Label htmlFor="alive">Alive</Label>
      </div>
  
      <div className="space-y-1">
        <Label htmlFor="birthDate">Birth Date</Label>
        <div className="relative">
          <CalendarIcon className="absolute left-2 top-2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            id="birthDate"
            type="date"
            value={member.birthDate}
            onChange={(e) => onUpdateMember({ ...member, birthDate: e.target.value })}
            className="pl-7"
          />
        </div>
      </div>
  
      {!member.alive && (
        <div className="space-y-1">
          <Label htmlFor="deathDate">Death Date</Label>
          <div className="relative">
            <CalendarIcon className="absolute left-2 top-2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              id="deathDate"
              type="date"
              value={member.deathDate || ''}
              onChange={(e) => onUpdateMember({ ...member, deathDate: e.target.value })}
              className="pl-7"
            />
          </div>
        </div>
      )}
  
      <Button
        variant="destructive"
        className="w-full text-sm py-2"
        onClick={() => onDeleteMember(member.id)}
      >
        <Trash2Icon className="mr-1.5 h-3.5 w-3.5" />
        Delete
      </Button>
    </CardContent>
  </Card>
  
  )
}

