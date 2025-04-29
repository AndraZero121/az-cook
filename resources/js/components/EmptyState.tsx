import { LucideIcon } from "lucide-react";
import Button from "./Button";

interface Props {
  title: string;
  description: string;
  icon?: LucideIcon;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ 
  title, 
  description, 
  icon: Icon,
  action 
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      {Icon && (
        <div className="w-16 h-16 mb-6 text-gray-400">
          <Icon size={64} strokeWidth={1.5} />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 max-w-sm mb-6">
        {description}
      </p>
      {action && (
        <Button
          onClick={action.onClick}
          size="lg"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}