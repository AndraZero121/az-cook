import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
  animation?: 'pulse' | 'wave' | 'none';
}

export default function Skeleton({ 
  className = '', 
  variant = 'rectangular',
  animation = 'pulse'
}: Props) {
  const baseClass = 'bg-gray-200';
  const animations = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: ''
  };
  const variants = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded h-4'
  };

  return (
    <div
      className={cn(
        baseClass,
        variants[variant],
        animations[animation],
        className
      )}
    />
  );
}

// Create recipe card skeleton for consistent loading states
export function RecipeCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-48 w-full" />
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
      <div className="flex items-center space-x-2 pt-2">
        <Skeleton variant="circular" className="h-8 w-8" />
        <Skeleton variant="text" className="w-24" />
      </div>
    </div>
  );
}

// Create comment skeleton
export function CommentSkeleton() {
  return (
    <div className="flex space-x-3">
      <Skeleton variant="circular" className="h-10 w-10 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" className="w-32" />
        <Skeleton variant="text" className="w-full" />
      </div>
    </div>
  );
}