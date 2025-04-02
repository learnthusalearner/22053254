import { Action } from '@/types/action';
import { toast } from "@/components/ui/use-toast";

export const executeAction = (action: Action): void => {
  try {
    switch (action.type) {
      case 'url':
        window.open(action.destination, '_blank');
        break;
      
      case 'email':
        window.location.href = `mailto:${action.destination}`;
        break;
      
      case 'text':
        // For text action, we'll copy to clipboard
        navigator.clipboard.writeText(action.destination)
          .then(() => {
            toast({
              title: "Text Copied",
              description: "The text has been copied to your clipboard.",
            });
          })
          .catch((err) => {
            console.error('Failed to copy text: ', err);
            toast({
              title: "Failed to Copy",
              description: "Could not copy text to clipboard.",
              variant: "destructive",
            });
          });
        break;
      
      case 'phone':
        window.location.href = `tel:${action.destination}`;
        break;
      
      case 'custom':
        // For custom actions, we'll just show a toast
        toast({
          title: "Custom Action Executed",
          description: `Executed: ${action.destination}`,
        });
        break;
      
      default:
        toast({
          title: "Action Not Supported",
          description: `The action type "${action.type}" is not supported yet.`,
          variant: "destructive",
        });
    }
  } catch (error) {
    console.error('Error executing action:', error);
    toast({
      title: "Action Failed",
      description: "Failed to execute this action. Please try again.",
      variant: "destructive",
    });
  }
};
