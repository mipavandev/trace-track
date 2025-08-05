import React, { useState } from 'react';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/components/LanguageContext';
import { 
  ArrowLeft, 
  Camera, 
  MapPin, 
  Calendar,
  Mic,
  Smartphone,
  Briefcase,
  Watch,
  Headphones
} from 'lucide-react';

interface ReportLostProps {
  onBack: () => void;
  onSubmit: () => void;
}

export function ReportLost({ onBack, onSubmit }: ReportLostProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const categories = [
    { id: 'phone', name: 'Phone', icon: <Smartphone className="w-6 h-6" /> },
    { id: 'bag', name: 'Bag/Backpack', icon: <Briefcase className="w-6 h-6" /> },
    { id: 'wallet', name: 'Wallet/Purse', icon: <Watch className="w-6 h-6" /> },
    { id: 'electronics', name: 'Electronics', icon: <Headphones className="w-6 h-6" /> },
  ];

  const Header = () => (
    <div className="flex items-center justify-between p-4">
      <Button variant="ghost" size="icon" onClick={onBack}>
        <ArrowLeft className="w-5 h-5" />
      </Button>
      <h1 className="text-lg font-semibold">{t('reportLostItem')}</h1>
      <div className="w-10" />
    </div>
  );

  return (
    <MobileLayout header={<Header />}>
      <div className="px-6 py-6 space-y-6">
        
        {/* Photo Upload */}
        <Card className="p-6 border-dashed border-2 border-primary/30 bg-primary/5">
          <div className="text-center">
            <Camera className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Add Photo (Optional)</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Help others identify your item
            </p>
            <Button variant="outline" className="w-full">
              <Camera className="w-4 h-4 mr-2" />
              Take Photo
            </Button>
          </div>
        </Card>

        {/* Category Selection */}
        <div>
          <Label className="text-base font-semibold mb-4 block">Item Category</Label>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <Card
                key={category.id}
                className={`p-4 cursor-pointer transition-all hover-lift ${
                  selectedCategory === category.id 
                    ? 'border-primary bg-primary/10' 
                    : 'hover:border-primary/50'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className={`${selectedCategory === category.id ? 'text-primary' : 'text-muted-foreground'}`}>
                    {category.icon}
                  </div>
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Journey Details */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">Journey Details</Label>
          
          <div>
            <Label htmlFor="ticket" className="text-sm">Ticket Number (Optional)</Label>
            <Input 
              id="ticket" 
              placeholder="Enter ticket number"
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="route" className="text-sm">Route/Line</Label>
              <Input 
                id="route" 
                placeholder="Bus #42, Metro Line 2"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="time" className="text-sm">Time Lost</Label>
              <Input 
                id="time" 
                type="time"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location" className="text-sm">Last Known Location</Label>
            <div className="flex gap-2 mt-1">
              <Input 
                id="location" 
                placeholder="Station/Stop name"
                className="flex-1"
              />
              <Button variant="outline" size="icon">
                <MapPin className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="description" className="text-sm">Description</Label>
            <Button
              variant="ghost"
              size="sm"
              className={`${isRecording ? 'text-red-500' : 'text-primary'}`}
              onClick={() => setIsRecording(!isRecording)}
            >
              <Mic className="w-4 h-4 mr-1" />
              {isRecording ? 'Stop' : 'Voice'}
            </Button>
          </div>
          <Textarea
            id="description"
            placeholder="Describe your item (color, brand, unique features...)"
            className="min-h-[100px]"
          />
        </div>

        {/* Submit Button */}
        <div className="space-y-3 pt-4">
          <Button 
            onClick={onSubmit}
            className="w-full h-12 text-lg font-semibold bg-gradient-primary"
            disabled={!selectedCategory}
          >
            Submit Report
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            We'll notify you immediately when a matching item is found
          </p>
        </div>
      </div>
    </MobileLayout>
  );
}