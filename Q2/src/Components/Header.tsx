import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onCreateAction: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateAction }) => {
  return (
    <header className={cn(
      "sticky top-0 z-10 w-full",
      "bg-white/80 backdrop-blur-sm border-b",
      "flex items-center justify-between px-4 py-3 md:px-6"
    )}>
      <div className="flex items-center">
        <Zap className="h-6 w-6 text-violet-600 mr-2" />
        <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
          Swift Action Maker
        </h1>
      </div>
      
      <Button 
        onClick={onCreateAction}
        size="sm"
        className="bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600"
      >
        <Plus className="h-4 w-4 mr-2" /> New Action
      </Button>
    </header>
  );
};

export default Header;