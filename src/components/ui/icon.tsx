import { icons, LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  name: keyof typeof icons;
}

export default function Icon({ name, color, size, ...props }: IconProps) {
  const LucideIcon = icons[name];
  return <LucideIcon color={color} size={size} {...props} />;
}
