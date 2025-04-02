import React, { createContext, useContext, useState, useEffect } from 'react';
import { Action, ActionType } from '@/types/action';
import { toast } from "@/components/ui/use-toast";

interface ActionContextType {
  actions: Action[];
  addAction: (action: Omit<Action, 'id' | 'createdAt'>) => void;
  updateAction: (id: string, action: Partial<Action>) => void;
  deleteAction: (id: string) => void;
  getActionById: (id: string) => Action | undefined;
}

const ActionContext = createContext<ActionContextType | undefined>(undefined);

export const useActions = () => {
  const context = useContext(ActionContext);
  if (!context) {
    throw new Error('useActions must be used within an ActionProvider');
  }
  return context;
};

const STORAGE_KEY = 'swift-actions';

// Generate a sample set of actions for first-time users
const generateSampleActions = (): Action[] => {
  return [
    {
      id: '1',
      name: 'Google Search',
      description: 'Quickly search Google',
      type: 'url' as ActionType,
      destination: 'https://www.google.com',
      color: '#4285F4',
      createdAt: new Date(),
      icon: 'search'
    },
    {
      id: '2',
      name: 'Send Email',
      description: 'Compose a new email',
      type: 'email' as ActionType,
      destination: 'example@example.com',
      color: '#DB4437',
      createdAt: new Date(),
      icon: 'mail'
    },
    {
      id: '3',
      name: 'Call Support',
      description: 'Contact customer service',
      type: 'phone' as ActionType,
      destination: '+1234567890',
      color: '#0F9D58',
      createdAt: new Date(),
      icon: 'phone'
    }
  ];
};

export const ActionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [actions, setActions] = useState<Action[]>([]);

  // Load actions from local storage on mount
  useEffect(() => {
    const storedActions = localStorage.getItem(STORAGE_KEY);
    if (storedActions) {
      try {
        const parsedActions = JSON.parse(storedActions);
        // Convert string dates back to Date objects
        const actionsWithDates = parsedActions.map((action: any) => ({
          ...action,
          createdAt: new Date(action.createdAt)
        }));
        setActions(actionsWithDates);
      } catch (e) {
        console.error('Error parsing stored actions:', e);
        // If there's an error, set sample actions
        setActions(generateSampleActions());
      }
    } else {
      // First time user - set sample actions
      setActions(generateSampleActions());
    }
  }, []);

  // Save actions to local storage whenever they change
  useEffect(() => {
    if (actions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(actions));
    }
  }, [actions]);

  const addAction = (newAction: Omit<Action, 'id' | 'createdAt'>) => {
    const action: Action = {
      ...newAction,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
    
    setActions((prev) => [...prev, action]);
    toast({
      title: "Action Created",
      description: `"${action.name}" has been created successfully.`,
    });
  };

  const updateAction = (id: string, updatedAction: Partial<Action>) => {
    setActions((prev) => 
      prev.map((action) => 
        action.id === id ? { ...action, ...updatedAction } : action
      )
    );
    toast({
      title: "Action Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const deleteAction = (id: string) => {
    const actionToDelete = actions.find(action => action.id === id);
    setActions((prev) => prev.filter((action) => action.id !== id));
    
    if (actionToDelete) {
      toast({
        title: "Action Deleted",
        description: `"${actionToDelete.name}" has been removed.`,
        variant: "destructive"
      });
    }
  };

  const getActionById = (id: string) => {
    return actions.find((action) => action.id === id);
  };

  const value = {
    actions,
    addAction,
    updateAction,
    deleteAction,
    getActionById,
  };

  return <ActionContext.Provider value={value}>{children}</ActionContext.Provider>;
};
