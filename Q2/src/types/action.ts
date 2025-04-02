export type ActionType = 'url' | 'email' | 'text' | 'phone' | 'custom';

export interface Action {
  id: string;
  name: string;
  description: string;
  type: ActionType;
  destination: string;
  shortcut?: string;
  color?: string;
  createdAt: Date;
  icon?: string;
}