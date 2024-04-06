import { icons } from 'lucide-react';

export interface IconProps {
  name: keyof typeof icons;
  size: number;
  color: string;
}

export function Icon({ name, size, color }: IconProps) {
  const LucideIcon = (icons as any)[name];

  return <LucideIcon size={size} color={color} />;
}
