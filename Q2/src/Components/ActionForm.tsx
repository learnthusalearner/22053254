import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Action, ActionType } from "@/types/action";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Search, Mail, MessageSquare, Phone, Rocket,
  Send, X
} from "lucide-react";

interface ActionFormProps {
  onSubmit: (action: Omit<Action, "id" | "createdAt">) => void;
  onCancel: () => void;
  initialValues?: Action;
  isEditing?: boolean;
}

const actionFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["url", "email", "text", "phone", "custom"]),
  destination: z.string().min(1, "Destination is required"),
  shortcut: z.string().optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
});

type ActionFormValues = z.infer<typeof actionFormSchema>;

const ActionForm: React.FC<ActionFormProps> = ({
  onSubmit,
  onCancel,
  initialValues,
  isEditing = false,
}) => {
  const form = useForm<ActionFormValues>({
    resolver: zodResolver(actionFormSchema),
    defaultValues: initialValues || {
      name: "",
      description: "",
      type: "url",
      destination: "",
      shortcut: "",
      color: "#7c3aed", // Default purple color
      icon: "",
    },
  });

  const handleSubmit = (values: ActionFormValues) => {
    onSubmit(values);
  };

  const actionTypes = [
    { value: "url", label: "URL", icon: <Search className="h-4 w-4" /> },
    { value: "email", label: "Email", icon: <Mail className="h-4 w-4" /> },
    { value: "text", label: "Text", icon: <MessageSquare className="h-4 w-4" /> },
    { value: "phone", label: "Phone", icon: <Phone className="h-4 w-4" /> },
    { value: "custom", label: "Custom", icon: <Rocket className="h-4 w-4" /> },
  ];

  const colorOptions = [
    "#7c3aed", // Purple
    "#3b82f6", // Blue
    "#10b981", // Green
    "#f59e0b", // Yellow
    "#ef4444", // Red
    "#6366f1", // Indigo
    "#ec4899", // Pink
    "#8b5cf6", // Violet
    "#14b8a6", // Teal
    "#f97316", // Orange
  ];

  const selectedType = form.watch("type");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 p-6 bg-white rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold">
          {isEditing ? "Edit Action" : "Create New Action"}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="My Action" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select action type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {actionTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center">
                          {type.icon}
                          <span className="ml-2">{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="What does this action do?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {selectedType === "url" && "URL"}
                {selectedType === "email" && "Email Address"}
                {selectedType === "text" && "Message"}
                {selectedType === "phone" && "Phone Number"}
                {selectedType === "custom" && "Command"}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    selectedType === "url" ? "https://example.com" :
                    selectedType === "email" ? "email@example.com" :
                    selectedType === "text" ? "Your message text" :
                    selectedType === "phone" ? "+1234567890" :
                    "Custom command"
                  }
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {selectedType === "url" && "The website URL to open"}
                {selectedType === "email" && "The email address to send to"}
                {selectedType === "text" && "The message text to send"}
                {selectedType === "phone" && "The phone number to call"}
                {selectedType === "custom" && "The custom command to execute"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shortcut"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keyboard Shortcut (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Ctrl+Shift+G" {...field} />
              </FormControl>
              <FormDescription>
                Define a keyboard shortcut to trigger this action (e.g., "Ctrl+Shift+G")
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <div
                      key={color}
                      className={`w-8 h-8 rounded-full cursor-pointer transition-all ${
                        field.value === color ? "ring-2 ring-offset-2 ring-black" : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => form.setValue("color", color)}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit" className="bg-gradient-to-r from-violet-500 to-indigo-500">
            <Send className="w-4 h-4 mr-2" />
            {isEditing ? "Save Changes" : "Create Action"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ActionForm;
