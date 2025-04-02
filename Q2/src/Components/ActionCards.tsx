import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Action } from '@/types/action';
import { 
  Search, Mail, MessageSquare, Phone, Rocket, 
  ExternalLink, Edit, Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionCardProps {
  action: Action;
  onEdit: (action: Action) => void;
  onDelete: (id: string) => void;
  onExecute: (action: Action) => void;
}

const ActionCard: React.FC<ActionCardProps> = ({ 
  action, onEdit, onDelete, onExecute 
}) => {
  const getIcon = () => {
    switch(action.icon || action.type) {
      case 'url':
      case 'search':
        return <Search className="h-5 w-5" />;
      case 'email':
      case 'mail':
        return <Mail className="h-5 w-5" />;
      case 'text':
      case 'message-square':
        return <MessageSquare className="h-5 w-5" />;
      case 'phone':
        return <Phone className="h-5 w-5" />;
      default:
        return <Rocket className="h-5 w-5" />;
    }
  };
  
  return (
    <Card className="w-full transition-all duration-200 hover:shadow-md">
      <CardHeader className={cn(
        "flex flex-row items-center justify-between p-4",
        "bg-gradient-to-r from-violet-500/10 to-indigo-500/10"
      )}>
        <div className="flex items-center">
          <div 
            className="p-2 rounded-full mr-3" 
            style={{ backgroundColor: action.color || '#7c3aed' }}
          >
            {getIcon()}
          </div>
          <div className="flex flex-col">
            <h3 className="font-medium text-lg">{action.name}</h3>
            <p className="text-muted-foreground text-sm">{action.type}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <p className="text-sm text-gray-600">{action.description}</p>
        <div className="mt-2 text-sm text-gray-500 truncate">
          {action.destination}
        </div>
        {action.shortcut && (
          <div className="mt-2">
            <span className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">
              {action.shortcut}
            </span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(action)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete(action.id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
        
        <Button 
          variant="default"
          size="sm" 
          onClick={() => onExecute(action)}
          className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white"
        >
          <ExternalLink className="h-4 w-4 mr-1" />
          Run
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActionCard;
