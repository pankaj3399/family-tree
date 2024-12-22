'use client'

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import { cn } from "@/lib/utils"
import { DialogTrigger } from '@radix-ui/react-dialog'

interface AddMemberModalProps {
  isOpen: boolean
  onClose: () => void
  onAddMember: (relationship: string, gender: 'male' | 'female', mid?:string, fid?:string) => void,
  members?: any[],
  selectedMember: any
}

const relationships = [
  { label: 'Husband', value: 'husband', genders: ['male'] },
  { label: 'Wife', value: 'wife', genders: ['female'] },
  { label: 'Father', value: 'father', genders: ['male'] },
  { label: 'Mother', value: 'mother', genders: ['female'] }
]

export const AddMemberModal: React.FC<AddMemberModalProps> = ({ 
  isOpen, 
  onClose, 
  onAddMember,
  selectedMember,
  members
}) => {


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Family Member</DialogTitle>
          
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 pt-4">
          {relationships.map((rel) => (
            rel.genders.map((gender) => (
              <Button
                key={`${rel.value}-${gender}`}
                onClick={() => {
                  onAddMember(rel.value, gender as 'male' | 'female')
                  onClose()
                }}
                className={cn(
                  "h-auto py-4 text-white",
                  gender === 'male' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-pink-500 hover:bg-pink-600'
                )}
              >
                <span className="font-semibold">{rel.label}</span>
                <span className="text-xs opacity-75 block">
                  ({gender.charAt(0).toUpperCase() + gender.slice(1)})
                </span>
              </Button>
            ))
          ))}
          {
            members && <>
              <AddSonModal onClose={onClose} onAddMember={onAddMember} selectedMember={selectedMember} members={members ?? []}   />
              <AddDaughterModal onClose={onClose} onAddMember={onAddMember} selectedMember={selectedMember} members={members ?? []}   />
            </>
          }
        </div>
      </DialogContent>
    </Dialog>
  )
}



const AddSonModal = ({members, selectedMember, onAddMember, onClose}:{
  members:any[],
  selectedMember: any,
  onAddMember: (relationship: string, gender: 'male' | 'female', mid?:string, fid?:string) => void,
  onClose: () => void
}) => {

  const [parents, setParents] = useState<any[]>([])
  const [open, setIsOpen] = useState(false)

  useEffect(()=>{
    if(!selectedMember || !members) return;
    setParents(members.filter(
      member => selectedMember?.pids && selectedMember?.pids.includes(member.id)
    ))
  },[members,selectedMember])

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={cn(
                    "h-auto py-4 text-white bg-blue-500 hover:bg-blue-600"
                  )}>Add Son</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h3>Select Parents</h3>
        </DialogHeader>
        <DialogDescription>
            {
              parents.map(parent => {
                return (
                  <Button key={parent.id} className={cn(
                    "h-auto py-4 text-white",
                    parent.gender === 'male' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-pink-500 hover:bg-pink-600'
                  )} onClick={()=>{
                    if(selectedMember.gender == 'male'){
                      onAddMember("son", "male", parent.id, selectedMember.id)
                    }else{
                      onAddMember("son", "male",selectedMember.id, parent.id)
                    }
                    setIsOpen(false)
                    onClose && onClose()
                  }}>
                    {parent.firstName}{" "}{parent.lastName}
                  </Button>
                )
              })
            }
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

const AddDaughterModal = ({members, selectedMember, onAddMember, onClose}:{
  members:any[],
  selectedMember: any,
  onAddMember: (relationship: string, gender: 'male' | 'female', mid?:string, fid?:string) => void,
  onClose: () => void
}) => {

  const [parents, setParents] = useState<any[]>([])
  const [open, setIsOpen] = useState(false)
  console.log(members);
  

  useEffect(()=>{
    if(!selectedMember || !members) return;
    setParents(members.filter(
      member => selectedMember?.pids && selectedMember?.pids.includes(member.id)
    ))
  },[members,selectedMember])

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={cn(
                    "h-auto py-4 text-white bg-pink-500 hover:bg-pink-600"
                  )}>Add Daughter</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h3>Select Parents</h3>
        </DialogHeader>
        <DialogDescription>
            {
              parents.map(parent => {
                return (
                  <Button key={parent.id} className={cn(
                    "h-auto py-4 text-white",
                    parent.gender === 'male' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-pink-500 hover:bg-pink-600'
                  )} onClick={()=>{
                    if(selectedMember.gender == 'male'){
                      onAddMember("daughter", "female", parent.id, selectedMember.id)
                    }else{
                      onAddMember("daughter", "female",selectedMember.id, parent.id)
                    }
                    setIsOpen(false)
                    onClose && onClose()
                  }}>
                    {parent.firstName}{" "}{parent.lastName}
                  </Button>
                )
              })
            }
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}