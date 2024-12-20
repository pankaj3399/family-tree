'use client'

import React, { useState } from 'react'
import { TREE_TEMPLATES } from '@/utils/constants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import * as Select from '@radix-ui/react-select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import {  MdOutlineZoomIn, MdOutlineZoomOut } from "react-icons/md";
import {  FaMale, FaFemale } from "react-icons/fa";

interface Settings {
  showBirthDates: boolean
  showDeathDates: boolean
  maleColor: string
  femaleColor: string
  backgroundColor: string
  orientation: string
  template: string
  maxMembers: number
  zoom:number
}

interface SettingsPanelProps {
  settings: Settings
  onSettingsChange: (updatedSettings: Settings) => void,
  tree: any
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onSettingsChange, tree }) => {
  const [localSettings, setLocalSettings] = useState<Settings>(settings)

  const handleChange = (field: keyof Settings, value: any) => {
    const updated = { ...localSettings, [field]: value }
    setLocalSettings(updated)
    onSettingsChange(updated)
  }

  // bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60

  return (
      <div className="flex flex-col items-end  justify-end z-50 h-64 sm:h-full  ">
        <div className="flex h-60 pt-2 lg:h-38 xl:h-32  container  items-center justify-between gap-4 py-6 px-6 ">
  
  
          {/* Settings Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 w-full ">
            
            {/* Zoom In/Out Buttons */}
            <div className="flex items-center space-x-2">
              {/* <Button
                size="sm"
                onClick={() => handleChange('maxMembers', localSettings.maxMembers + 1)}
                className="bg-gradient-to-r from-orange-500  to-pink-500 flex items-center justify-center"
              >
                <span className="hidden sm:inline">Zoom Out</span>
                <MdOutlineZoomIn className="sm:hidden text-lg"/>
              </Button> */}
              {/* <Button 
              //   size="sm"
              //   onClick={() => handleChange('maxMembers', localSettings.maxMembers - 1)}
              //   className="bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center"
              // >
                {/* Show text on larger screens and icon on smaller screens */}
                {/* <span className="hidden sm:inline">Zoom Out</span> */}
                {/* <MdOutlineZoomOut className="sm:hidden text-lg" /> */}
              {/* </Button> */}
            </div>
  
            {/* Switch for Birth/Death Dates */}
            <div className="flex items-center  gap-2">
              <div className="flex items-center space-x-2">
                <div className='flex flex-col justify-center items-center gap-2'>
                  <Label htmlFor="birthDates" className="text-gray-500">Birth Dates</Label>
                  <Switch
                    id="birthDates"
                    checked={localSettings.showBirthDates}
                    onCheckedChange={(checked) => handleChange('showBirthDates', checked)}
                    className="bg-green-500"
                  />
                </div>
              </div>
              <div className='flex flex-col justify-center items-center gap-2'>
                <Label htmlFor="deathDates" className="text-gray-500">Death Dates</Label>
                <Switch
                  id="deathDates"
                  checked={localSettings.showDeathDates}
                  onCheckedChange={(checked) => handleChange('showDeathDates', checked)}
                  className="bg-red-500"
                />
              </div>
            </div>
  
            {/* Color Inputs */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Label htmlFor="maleColor" className="text-gray-500"><FaMale className='text-3xl'/> </Label>
                <Input
                  id="maleColor"
                  type="color"
                  value={localSettings.maleColor}
                  onChange={(e) => handleChange('maleColor', e.target.value)}
                  className="w-12 h-12 p-1"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="femaleColor" className="text-gray-500"><FaFemale className='text-3xl'/></Label>
                <Input
                  id="femaleColor"
                  type="color"
                  value={localSettings.femaleColor}
                  onChange={(e) => handleChange('femaleColor', e.target.value)}
                  className="w-12 h-12 p-1"
                />
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                {/* <Label htmlFor="backgroundColor" className="text-gray-500">Background:</Label> */}
                {/* <Input
                  id="backgroundColor"
                  type="color"
                  value={localSettings.backgroundColor}
                  onChange={(e) => handleChange('backgroundColor', e.target.value)}
                  className="w-12 h-12 p-1"
                /> */}
              </div>
            </div>
  
            {/* Orientation and Template Selectors */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="orientation" className="text-gray-500">Tree Orientation:</Label> 
              <Select.Root
                  value={localSettings.orientation}
                  onValueChange={(value) => handleChange('orientation', value)}
                >
                  <Select.Trigger className="w-[180px]">
                    <Select.Value placeholder="Select orientation" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="vertical">Vertical</Select.Item>
                    <Select.Item value="horizontal">Horizontal</Select.Item>
                  </Select.Content>
                </Select.Root> 
              </div>
  
              <div className="flex items-center space-x-2">
                {/* <Label htmlFor="template" className="text-gray-500">Template:</Label> */}
                <Select.Root
                  value={localSettings.template}
                  onValueChange={(value) => handleChange('template', value)}
                >
                  <Select.Trigger>
                    <Select.Value placeholder="Select template" />
                  </Select.Trigger>
                  <Select.Content>
                    {TREE_TEMPLATES.map((template) => (
                      <Select.Item key={template} value={template}>
                        {template}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </div>
            </div>
  
            {/* Max Members Slider */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="maxMembers" className="text-gray-500">Max Members:</Label>
                <Slider
                  id="maxMembers"
                  min={1}
                  max={40}
                  step={1}
                  value={[localSettings.maxMembers]}
                  onValueChange={(value) => handleChange('maxMembers', value[0])}
                  className="w-[200px]"
                />
                <span className="w-8 text-center">{localSettings.maxMembers}</span>
              </div>
            </div>
            
            <div>
              {/* <Button onClick={() => alert('Settings saved!')} className="bg-blue-500 text-white hover:bg-blue-600">
                Save
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    )
  }