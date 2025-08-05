import React, { useState } from 'react';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/LanguageContext';
import { 
  ArrowLeft, 
  MapPin,
  Clock,
  Phone,
  Navigation,
  Star,
  Package,
  Users,
  Truck
} from 'lucide-react';

interface NearbyDepotsProps {
  onBack: () => void;
}

export function NearbyDepots({ onBack }: NearbyDepotsProps) {
  const { t } = useLanguage();
  const [selectedDepot, setSelectedDepot] = useState<string | null>(null);

  const depots = [
    {
      id: 'central',
      name: 'Central Transport Depot',
      address: '123 Main Street, Downtown',
      distance: '0.8 km',
      walkTime: '10 min walk',
      status: 'open',
      hours: '6:00 AM - 10:00 PM',
      phone: '+91 98765 43210',
      rating: 4.5,
      itemsAvailable: 23,
      staffOnDuty: 4,
      services: ['Lost Items', 'Found Items', 'Claims Processing', 'Customer Support'],
      busyLevel: 'low'
    },
    {
      id: 'south',
      name: 'South Station Depot',
      address: '456 South Avenue, South District',
      distance: '2.1 km',
      walkTime: '25 min walk',
      status: 'open',
      hours: '7:00 AM - 9:00 PM',
      phone: '+91 98765 43211',
      rating: 4.2,
      itemsAvailable: 15,
      staffOnDuty: 2,
      services: ['Lost Items', 'Claims Processing'],
      busyLevel: 'medium'
    },
    {
      id: 'north',
      name: 'North Metro Hub',
      address: '789 North Road, Metro District',
      distance: '3.5 km',
      walkTime: '12 min by bus',
      status: 'busy',
      hours: '5:00 AM - 11:00 PM',
      phone: '+91 98765 43212',
      rating: 4.7,
      itemsAvailable: 41,
      staffOnDuty: 6,
      services: ['Lost Items', 'Found Items', 'Claims Processing', 'Express Service'],
      busyLevel: 'high'
    },
    {
      id: 'east',
      name: 'East Terminal',
      address: '321 East Junction, Airport Link',
      distance: '5.2 km',
      walkTime: '30 min by metro',
      status: 'closed',
      hours: '8:00 AM - 6:00 PM (Closed)',
      phone: '+91 98765 43213',
      rating: 4.0,
      itemsAvailable: 8,
      staffOnDuty: 0,
      services: ['Lost Items', 'Claims Processing'],
      busyLevel: 'closed'
    }
  ];

  const Header = () => (
    <div className="flex items-center justify-between p-4">
      <Button variant="ghost" size="icon" onClick={onBack}>
        <ArrowLeft className="w-5 h-5" />
      </Button>
      <h1 className="text-lg font-semibold">Nearby Depots</h1>
      <Button variant="ghost" size="icon">
        <Navigation className="w-5 h-5" />
      </Button>
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800 border-green-200';
      case 'busy': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'closed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getBusyLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getBusyLevelText = (level: string) => {
    switch (level) {
      case 'low': return 'Not busy';
      case 'medium': return 'Moderately busy';
      case 'high': return 'Very busy';
      case 'closed': return 'Closed';
      default: return 'Unknown';
    }
  };

  return (
    <MobileLayout header={<Header />}>
      <div className="px-6 py-6 space-y-6">
        
        {/* Current Location Banner */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="font-medium">Your Location</p>
              <p className="text-sm text-muted-foreground">Downtown Metro Station</p>
            </div>
            <Button size="sm" variant="outline">
              Update
            </Button>
          </div>
        </Card>

        {/* Depot List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Available Depots</h2>
            <Button variant="ghost" size="sm">
              Map View
            </Button>
          </div>

          {depots.map((depot) => (
            <Card 
              key={depot.id} 
              className={`p-5 cursor-pointer transition-all hover-lift ${
                selectedDepot === depot.id ? 'border-primary bg-primary/5' : ''
              }`}
              onClick={() => setSelectedDepot(selectedDepot === depot.id ? null : depot.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{depot.name}</h3>
                  <p className="text-sm text-muted-foreground">{depot.address}</p>
                </div>
                <Badge className={`${getStatusColor(depot.status)} border ml-2`}>
                  {depot.status.charAt(0).toUpperCase() + depot.status.slice(1)}
                </Badge>
              </div>

              {/* Distance & Rating */}
              <div className="flex items-center gap-4 mb-3 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{depot.distance}</span>
                  <span className="text-muted-foreground">• {depot.walkTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>{depot.rating}</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <Package className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Items</p>
                  <p className="font-semibold">{depot.itemsAvailable}</p>
                </div>
                <div className="text-center">
                  <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Staff</p>
                  <p className="font-semibold">{depot.staffOnDuty}</p>
                </div>
                <div className="text-center">
                  <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Wait Time</p>
                  <p className={`font-semibold ${getBusyLevelColor(depot.busyLevel)}`}>
                    {getBusyLevelText(depot.busyLevel)}
                  </p>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedDepot === depot.id && (
                <div className="border-t pt-4 space-y-4 animate-fade-in">
                  {/* Hours & Contact */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{depot.hours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{depot.phone}</span>
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <p className="text-sm font-medium mb-2">Available Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {depot.services.map((service, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Button size="sm" disabled={depot.status === 'closed'}>
                      <Navigation className="w-4 h-4 mr-1" />
                      Directions
                    </Button>
                    <Button size="sm" variant="outline" disabled={depot.status === 'closed'}>
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                  </div>
                </div>
              )}

              {/* Basic Action Buttons (when not expanded) */}
              {selectedDepot !== depot.id && (
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1" disabled={depot.status === 'closed'}>
                    Get Directions
                  </Button>
                  <Button size="sm" variant="outline">
                    Details
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Emergency Contact */}
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-red-600" />
              <h4 className="font-semibold text-red-900">Emergency Lost Item?</h4>
            </div>
            <p className="text-sm text-red-800">
              If you've lost something valuable or urgent, contact our 24/7 helpline
            </p>
            <Button size="sm" className="bg-red-600 hover:bg-red-700">
              <Phone className="w-4 h-4 mr-1" />
              Emergency Hotline
            </Button>
          </div>
        </Card>

        {/* Add bottom padding for navbar */}
        <div className="pb-8" />
      </div>
    </MobileLayout>
  );
}