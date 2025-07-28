import React from 'react';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  showSafeArea?: boolean;
}

export function MobileLayout({ 
  children, 
  className, 
  header,
  showSafeArea = true 
}: MobileLayoutProps) {
  return (
    <div className={cn(
      "min-h-screen bg-neutral-50",
      "max-w-md mx-auto relative",
      showSafeArea && "safe-area",
      className
    )}>
      {header && (
        <div className="sticky top-0 z-50 glass border-b border-neutral-200/50">
          {header}
        </div>
      )}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}