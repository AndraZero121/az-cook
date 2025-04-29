import { AlertTriangle, CheckCircle, Info, X, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  title?: string;
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info";
  onClose?: () => void;
  className?: string;
}

export default function Alert({
  title,
  children,
  variant = "default",
  onClose,
  className = "",
}: Props) {
  const variants = {
    default: {
      container: "bg-gray-100 text-gray-800 border-gray-300",
      icon: null,
    },
    success: {
      container: "bg-green-50 text-green-800 border-green-300",
      icon: CheckCircle,
    },
    warning: {
      container: "bg-yellow-50 text-yellow-800 border-yellow-300",
      icon: AlertTriangle,
    },
    error: {
      container: "bg-red-50 text-red-800 border-red-300",
      icon: XCircle,
    },
    info: {
      container: "bg-blue-50 text-blue-800 border-blue-300",
      icon: Info,
    },
  };

  const Icon = variants[variant].icon;

  return (
    <div
      className={cn(
        "relative rounded-lg border p-4",
        variants[variant].container,
        className
      )}
    >
      <div className="flex items-start gap-3">
        {Icon && (
          <Icon className="h-5 w-5 flex-shrink-0" />
        )}
        <div className="flex-1">
          {title && (
            <h5 className="mb-1 font-medium leading-none tracking-tight">
              {title}
            </h5>
          )}
          <div className="text-sm [&>:first-child]:mt-0 [&>:last-child]:mb-0">
            {children}
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-lg p-1 opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}