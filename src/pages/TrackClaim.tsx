import React, { useState } from 'react';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/LanguageContext';
import { 
  ArrowLeft, 
  Search, 
  Package,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  Truck,
  QrCode
} from 'lucide-react';

interface TrackClaimProps {
  onBack: () => void;
}

export function TrackClaim({ onBack }: TrackClaimProps) {
  const { t } = useLanguage();
  const [trackingId, setTrackingId] = useState('');

  const claims = [
    {
      id: 'TC-2024-001',
      item: 'iPhone 14 Pro - Black',
      status: 'ready-pickup',
      location: 'Central Depot - Counter 3',
      lastUpdate: '10 minutes ago',
      estimatedPickup: 'Available now',
      steps: [
        { title: 'Item Reported', completed: true, time: '2 days ago' },
        { title: 'Match Found', completed: true, time: '1 day ago' },
        { title: 'Identity Verified', completed: true, time: '4 hours ago' },
        { title: 'Ready for Pickup', completed: true, time: '10 minutes ago' },
        { title: 'Item Returned', completed: false, time: null },
      ]
    },
    {
      id: 'TC-2024-002',
      item: 'Black Backpack - Nike',
      status: 'in-transit',
      location: 'En route to South Depot',
      lastUpdate: '2 hours ago',
      estimatedPickup: 'Tomorrow 2:00 PM',
      steps: [
        { title: 'Item Reported', completed: true, time: '3 days ago' },
        { title: 'Match Found', completed: true, time: '2 days ago' },
        { title: 'Identity Verified', completed: true, time: '1 day ago' },
        { title: 'In Transit', completed: true, time: '2 hours ago' },
        { title: 'Ready for Pickup', completed: false, time: null },
      ]
    }
  ];

  const Header = () => (
    <div className="flex items-center justify-between p-4">
      <Button variant="ghost" size="icon" onClick={onBack}>
        <ArrowLeft className="w-5 h-5" />
      </Button>
      <h1 className="text-lg font-semibold">Track Claims</h1>
      <Button variant="ghost" size="icon">
        <QrCode className="w-5 h-5" />
      </Button>
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready-pickup': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-transit': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ready-pickup': return 'Ready for Pickup';
      case 'in-transit': return 'In Transit';
      case 'processing': return 'Processing';
      default: return 'Unknown';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready-pickup': return <CheckCircle className="w-4 h-4" />;
      case 'in-transit': return <Truck className="w-4 h-4" />;
      case 'processing': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <MobileLayout header={<Header />}>
      <div className="px-6 py-6 space-y-6">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Enter tracking ID (e.g., TC-2024-001)"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Active Claims */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Your Active Claims</h2>
          
          {claims.map((claim) => (
            <Card key={claim.id} className="p-5 hover-lift cursor-pointer">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{claim.item}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Tracking ID: {claim.id}
                  </p>
                </div>
                <Badge className={`${getStatusColor(claim.status)} border flex items-center gap-1`}>
                  {getStatusIcon(claim.status)}
                  {getStatusText(claim.status)}
                </Badge>
              </div>

              {/* Location & Time */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{claim.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Last updated: {claim.lastUpdate}</span>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="space-y-3 mb-4">
                <h4 className="font-medium text-sm">Progress</h4>
                <div className="space-y-2">
                  {claim.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        step.completed 
                          ? 'bg-primary' 
                          : index === claim.steps.findIndex(s => !s.completed)
                          ? 'bg-primary/50'
                          : 'bg-muted'
                      }`} />
                      <div className="flex-1">
                        <span className={`text-sm ${
                          step.completed ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {step.title}
                        </span>
                        {step.time && (
                          <span className="text-xs text-muted-foreground ml-2">
                            {step.time}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Estimated Pickup */}
              <div className="bg-muted/50 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Estimated Pickup:</span>
                  <span className="text-sm text-primary">{claim.estimatedPickup}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  {claim.status === 'ready-pickup' ? 'Get Directions' : 'View Details'}
                </Button>
                <Button size="sm" variant="outline">
                  Contact Support
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="font-semibold text-muted-foreground">Quick Actions</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 cursor-pointer hover-lift">
              <div className="text-center space-y-2">
                <QrCode className="w-8 h-8 text-primary mx-auto" />
                <span className="text-sm font-medium">Scan QR Code</span>
              </div>
            </Card>
            
            <Card className="p-4 cursor-pointer hover-lift">
              <div className="text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-primary mx-auto" />
                <span className="text-sm font-medium">Report Issue</span>
              </div>
            </Card>
          </div>
        </div>

        {/* Help Section */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="space-y-3">
            <h4 className="font-semibold text-blue-900">Need Help?</h4>
            <div className="space-y-2 text-sm text-blue-800">
              <p>• Use your tracking ID to check claim status</p>
              <p>• Bring valid ID when picking up items</p>
              <p>• Items are held for 30 days maximum</p>
            </div>
            <Button size="sm" variant="outline" className="mt-3">
              Contact Support
            </Button>
          </div>
        </Card>

        {/* Add bottom padding for navbar */}
        <div className="pb-8" />
      </div>
    </MobileLayout>
  );
}