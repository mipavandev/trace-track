import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'primary' | 'emerald' | 'rose' | 'amber';
  size?: 'default' | 'sm';
}

export function ActionCard({ 
  icon, 
  title, 
  description, 
  onClick, 
  className,
  variant = 'default',
  size = 'default'
}: ActionCardProps) {
  const variantStyles = {
    default: 'bg-white border-neutral-200 hover:border-neutral-300',
    primary: 'bg-indigo-50 border-indigo-200 hover:border-indigo-300',
    emerald: 'bg-emerald-50 border-emerald-200 hover:border-emerald-300',
    rose: 'bg-rose-50 border-rose-200 hover:border-rose-300',
    amber: 'bg-amber-50 border-amber-200 hover:border-amber-300'
  };

  const iconStyles = {
    default: 'text-neutral-600',
    primary: 'text-indigo-600',
    emerald: 'text-emerald-600',
    rose: 'text-rose-600',
    amber: 'text-amber-600'
  };

  const sizeStyles = {
    default: 'p-6',
    sm: 'p-4'
  };

  return (
    <Card 
      className={cn(
        "cursor-pointer hover-lift animate-fade-in transition-all duration-200",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      onClick={onClick}
    >
      <div className={cn(
        "flex items-center",
        size === 'default' ? 'space-x-4' : 'space-x-3'
      )}>
        <div className={cn(
          iconStyles[variant],
          size === 'default' ? 'text-2xl' : 'text-xl'
        )}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "font-semibold text-neutral-900",
            size === 'default' ? 'text-lg mb-1' : 'text-base mb-0.5'
          )}>
            {title}
          </h3>
          <p className={cn(
            "text-neutral-600",
            size === 'default' ? 'text-sm' : 'text-xs'
          )}>
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}