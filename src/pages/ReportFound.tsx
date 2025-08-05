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
  Clock,
  Eye,
  Package,
  Smartphone,
  Briefcase,
  Watch,
  Headphones
} from 'lucide-react';

interface ReportFoundProps {
  onBack: () => void;
  onSubmit: () => void;
}

export function ReportFound({ onBack, onSubmit }: ReportFoundProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [reportType, setReportType] = useState<'found' | 'seen'>('found');

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
      <h1 className="text-lg font-semibold">Report Found Item</h1>
      <div className="w-10" />
    </div>
  );

  return (
    <MobileLayout header={<Header />}>
      <div className="px-6 py-6 space-y-6">
        
        {/* Report Type Selection */}
        <div>
          <Label className="text-base font-semibold mb-4 block">What did you do?</Label>
          <div className="grid grid-cols-2 gap-3">
            <Card
              className={`p-4 cursor-pointer transition-all hover-lift ${
                reportType === 'found' 
                  ? 'border-primary bg-primary/10' 
                  : 'hover:border-primary/50'
              }`}
              onClick={() => setReportType('found')}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <Package className={`w-8 h-8 ${reportType === 'found' ? 'text-primary' : 'text-muted-foreground'}`} />
                <div>
                  <span className="text-sm font-medium block">Found & Picked Up</span>
                  <span className="text-xs text-muted-foreground">I have the item</span>
                </div>
              </div>
            </Card>
            
            <Card
              className={`p-4 cursor-pointer transition-all hover-lift ${
                reportType === 'seen' 
                  ? 'border-primary bg-primary/10' 
                  : 'hover:border-primary/50'
              }`}
              onClick={() => setReportType('seen')}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <Eye className={`w-8 h-8 ${reportType === 'seen' ? 'text-primary' : 'text-muted-foreground'}`} />
                <div>
                  <span className="text-sm font-medium block">Saw Something</span>
                  <span className="text-xs text-muted-foreground">I noticed an item</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Photo Upload */}
        <Card className="p-6 border-dashed border-2 border-primary/30 bg-primary/5">
          <div className="text-center">
            <Camera className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Add Photo</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Help owners identify their item
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

        {/* Location Details */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">Location Details</Label>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="route" className="text-sm">Route/Vehicle</Label>
              <Input 
                id="route" 
                placeholder="Bus #42, Metro Line 2"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="seat" className="text-sm">Seat/Area</Label>
              <Input 
                id="seat" 
                placeholder="Seat 12, Floor"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="station" className="text-sm">Station/Stop</Label>
            <div className="flex gap-2 mt-1">
              <Input 
                id="station" 
                placeholder="Current station/stop"
                className="flex-1"
              />
              <Button variant="outline" size="icon">
                <MapPin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="time" className="text-sm">Time Found</Label>
            <Input 
              id="time" 
              type="datetime-local"
              className="mt-1"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="text-sm">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the item (color, brand, condition, any unique features...)"
            className="min-h-[100px] mt-1"
          />
        </div>

        {/* Contact Information */}
        {reportType === 'found' && (
          <div className="space-y-4">
            <Label className="text-base font-semibold">Your Contact Info</Label>
            
            <div>
              <Label htmlFor="contact" className="text-sm">Phone/Email</Label>
              <Input 
                id="contact" 
                placeholder="How can owners reach you?"
                className="mt-1"
              />
            </div>
            
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 mb-1">Privacy Protected</p>
                  <p className="text-blue-700">
                    Your contact info will only be shared with verified item owners
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Submit Button */}
        <div className="space-y-3 pt-4 pb-8">
          <Button 
            onClick={onSubmit}
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg"
            disabled={!selectedCategory}
          >
            {reportType === 'found' ? 'Submit Found Item' : 'Report Sighting'}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            {reportType === 'found' 
              ? "We'll help connect you with the owner" 
              : "Your tip will help someone find their item"
            }
          </p>
        </div>
      </div>
    </MobileLayout>
  );
}