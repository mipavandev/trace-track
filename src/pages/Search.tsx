import React, { useState } from 'react';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/LanguageContext';
import { 
  Search as SearchIcon, 
  Filter, 
  MapPin, 
  Clock,
  Smartphone,
  Briefcase,
  Watch,
  Headphones,
  Calendar
} from 'lucide-react';

interface SearchProps {
  onBack: () => void;
}

export function Search({ onBack }: SearchProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All Items' },
    { id: 'lost', name: 'Lost' },
    { id: 'found', name: 'Found' },
    { id: 'claimed', name: 'Claimed' }
  ];

  const categories = [
    { id: 'phone', name: 'Phone', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'bag', name: 'Bag', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'wallet', name: 'Wallet', icon: <Watch className="w-4 h-4" /> },
    { id: 'electronics', name: 'Electronics', icon: <Headphones className="w-4 h-4" /> },
  ];

  const searchResults = [
    {
      id: 1,
      type: 'lost',
      item: 'iPhone 14 Pro',
      category: 'phone',
      location: 'Bus #42, Route 15',
      time: '2 hours ago',
      description: 'Black iPhone with blue case, found near seat 12',
      confidence: 92
    },
    {
      id: 2,
      type: 'found',
      item: 'Black Backpack',
      category: 'bag',
      location: 'Metro Line 2, Central Station',
      time: '4 hours ago',
      description: 'Nike backpack with laptop inside',
      confidence: 78
    },
    {
      id: 3,
      type: 'lost',
      item: 'Wireless Headphones',
      category: 'electronics',
      location: 'Bus #24, Downtown',
      time: '1 day ago',
      description: 'Sony WH-1000XM4, noise cancelling',
      confidence: 85
    }
  ];

  const Header = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Search Items</h1>
        <Button variant="ghost" size="icon">
          <Filter className="w-5 h-5" />
        </Button>
      </div>
      
      {/* Search Bar */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search lost or found items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12"
        />
      </div>

      {/* Filter Tags */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={selectedFilter === filter.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter(filter.id)}
            className="whitespace-nowrap"
          >
            {filter.name}
          </Button>
        ))}
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant="secondary"
            className="flex items-center gap-1 whitespace-nowrap cursor-pointer hover:bg-primary/10"
          >
            {category.icon}
            {category.name}
          </Badge>
        ))}
      </div>
    </div>
  );

  return (
    <MobileLayout header={<Header />}>
      <div className="px-6 py-4 space-y-4">
        
        {/* Search Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-muted-foreground">
              {searchResults.length} results found
            </h2>
            <Button variant="ghost" size="sm">
              Sort by: Recent
            </Button>
          </div>

          {searchResults.map((result) => (
            <Card key={result.id} className="p-4 hover-lift cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={result.type === 'lost' ? 'destructive' : 'default'}
                    className="text-xs"
                  >
                    {result.type.toUpperCase()}
                  </Badge>
                  {result.confidence && (
                    <Badge variant="secondary" className="text-xs">
                      {result.confidence}% match
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {result.time}
                </span>
              </div>

              <h3 className="font-semibold mb-2">{result.item}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {result.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {result.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {result.time}
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <Button size="sm" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  Contact
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results State */}
        {searchQuery && searchResults.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <SearchIcon className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">No items found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}

        {/* Recent Searches */}
        {!searchQuery && (
          <div className="space-y-4">
            <h3 className="font-semibold text-muted-foreground">Recent Searches</h3>
            <div className="space-y-2">
              {['iPhone', 'Black backpack', 'Wallet'].map((term, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-left"
                  onClick={() => setSearchQuery(term)}
                >
                  <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                  {term}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Add bottom padding for navbar */}
        <div className="pb-8" />
      </div>
    </MobileLayout>
  );
}