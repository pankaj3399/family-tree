'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import { cn } from "@/lib/utils"

interface AddMemberModalProps {
  isOpen: boolean
  onClose: () => void
  onAddMember: (relationship: string, gender: 'male' | 'female') => void
}

const relationships = [
  { label: 'Son', value: 'son', genders: ['male'] },
  { label: 'Daughter', value: 'daughter', genders: ['female'] },
  { label: 'Husband', value: 'husband', genders: ['male'] },
  { label: 'Wife', value: 'wife', genders: ['female'] },
  { label: 'Father', value: 'father', genders: ['male'] },
  { label: 'Mother', value: 'mother', genders: ['female'] }
]

export const AddMemberModal: React.FC<AddMemberModalProps> = ({ 
  isOpen, 
  onClose, 
  onAddMember 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Family Member</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
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
        </div>
      </DialogContent>
    </Dialog>
  )
}

