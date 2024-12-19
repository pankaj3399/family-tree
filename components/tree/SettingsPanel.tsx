'use client'

import React, { useState } from 'react'
import { TREE_TEMPLATES } from '@/utils/constants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import * as Select from '@radix-ui/react-select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'

interface Settings {
  showBirthDates: boolean
  showDeathDates: boolean
  maleColor: string
  femaleColor: string
  backgroundColor: string
  orientation: string
  template: string
  maxMembers: number
}

interface SettingsPanelProps {
  settings: Settings
  onSettingsChange: (updatedSettings: Settings) => void
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onSettingsChange }) => {
  const [localSettings, setLocalSettings] = useState<Settings>(settings)

  const handleChange = (field: keyof Settings, value: any) => {
    const updated = { ...localSettings, [field]: value }
    setLocalSettings(updated)
    onSettingsChange(updated)
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between gap-4 py-4 px-6">


        {/* Settings Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 w-full">
          
          {/* Zoom In/Out Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              size="sm"
              onClick={() => handleChange('maxMembers', localSettings.maxMembers + 1)}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Zoom In
            </Button>
            <Button
              size="sm"
              onClick={() => handleChange('maxMembers', localSettings.maxMembers - 1)}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Zoom Out
            </Button>
          </div>

          {/* Switch for Birth/Death Dates */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="birthDates"
                checked={localSettings.showBirthDates}
                onCheckedChange={(checked) => handleChange('showBirthDates', checked)}
                className="bg-green-500"
              />
              <Label htmlFor="birthDates" className="text-gray-700">Birth Dates</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="deathDates"
                checked={localSettings.showDeathDates}
                onCheckedChange={(checked) => handleChange('showDeathDates', checked)}
                className="bg-red-500"
              />
              <Label htmlFor="deathDates" className="text-gray-700">Death Dates</Label>
            </div>
          </div>

          {/* Color Inputs */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Label htmlFor="maleColor" className="text-gray-700">Men:</Label>
              <Input
                id="maleColor"
                type="color"
                value={localSettings.maleColor}
                onChange={(e) => handleChange('maleColor', e.target.value)}
                className="w-12 h-12 p-1"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="femaleColor" className="text-gray-700">Women:</Label>
              <Input
                id="femaleColor"
                type="color"
                value={localSettings.femaleColor}
                onChange={(e) => handleChange('femaleColor', e.target.value)}
                className="w-12 h-12 p-1"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="backgroundColor" className="text-gray-700">Background:</Label>
              <Input
                id="backgroundColor"
                type="color"
                value={localSettings.backgroundColor}
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                className="w-12 h-12 p-1"
              />
            </div>
          </div>

          {/* Orientation and Template Selectors */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Label htmlFor="orientation" className="text-gray-700">Tree Orientation:</Label>
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
              <Label htmlFor="template" className="text-gray-700">Template:</Label>
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
              <Label htmlFor="maxMembers" className="text-gray-700">Max Members:</Label>
              <Slider
                id="maxMembers"
                min={1}
                max={100}
                step={1}
                value={[localSettings.maxMembers]}
                onValueChange={(value) => handleChange('maxMembers', value[0])}
                className="w-[200px]"
              />
              <span className="w-8 text-center">{localSettings.maxMembers}</span>
            </div>
          </div>

          <Button onClick={() => alert('Settings saved!')} className="bg-blue-500 text-white hover:bg-blue-600">
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
