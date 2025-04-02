import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

interface EmptyStateProps {
  onCreateAction: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onCreateAction }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center h-[400px]">
      <div className="h-24 w-24 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-full flex items-center justify-center mb-6">
        <div className="h-16 w-16 bg-gradient-to-br from-violet-500/40 to-indigo-500/40 rounded-full flex items-center justify-center animate-pulse-subtle">
          <Plus className="h-8 w-8 text-violet-600" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold mb-2">No Actions Yet</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        Create your first quick action to boost your productivity. 
        Swift actions help you perform tasks faster with just a click.
      </p>
      
      <Button 
        onClick={onCreateAction} 
        className="bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600"
      >
        <Plus className="mr-2 h-4 w-4" /> Create Your First Action
      </Button>
    </div>
  );
};

export default EmptyState;
