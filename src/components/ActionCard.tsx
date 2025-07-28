import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
  gradient?: 'primary' | 'warm' | 'trust';
}

export function ActionCard({ 
  icon, 
  title, 
  description, 
  onClick, 
  className, 
  gradient = 'primary' 
}: ActionCardProps) {
  const gradientClass = {
    primary: 'bg-gradient-primary',
    warm: 'bg-gradient-warm',
    trust: 'bg-gradient-trust'
  }[gradient];

  return (
    <Card 
      className={cn(
        "p-6 cursor-pointer hover-lift animate-slide-up",
        "border-none shadow-lg",
        gradientClass,
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className="text-white text-2xl">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg">{title}</h3>
          <p className="text-white/80 text-sm">{description}</p>
        </div>
      </div>
    </Card>
  );
}