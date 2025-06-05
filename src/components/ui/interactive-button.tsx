
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface InteractiveButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'large';
  className?: string;
  disabled?: boolean;
}

const InteractiveButton = ({ 
  children, 
  to, 
  onClick, 
  variant = 'primary', 
  size = 'default',
  className,
  disabled = false
}: InteractiveButtonProps) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) return;
    
    if (to) {
      // Scroll to top when navigating
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate(to);
    }
    
    if (onClick) {
      onClick();
    }
  };

  const baseClasses = "inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-300 ease-out transform cursor-pointer select-none";
  
  const variantClasses = {
    primary: "bg-vergreen-600 text-white hover:bg-vergreen-700 hover:scale-105 hover:shadow-xl active:scale-95 active:bg-vergreen-800 focus:ring-2 focus:ring-vergreen-500 focus:ring-offset-2",
    secondary: "bg-white text-vergreen-600 border-2 border-vergreen-200 hover:bg-vergreen-600 hover:text-white hover:scale-105 hover:shadow-lg active:scale-95 focus:ring-2 focus:ring-vergreen-500",
    ghost: "bg-transparent text-vergreen-600 hover:bg-vergreen-50 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-vergreen-500"
  };

  const sizeClasses = {
    default: "px-6 py-3 text-sm min-h-[44px]",
    large: "px-8 py-4 text-base min-h-[52px]"
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed hover:scale-100 hover:bg-gray-400 pointer-events-none" : "";

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      type="button"
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabledClasses,
        className
      )}
      style={{ touchAction: 'manipulation' }}
    >
      {children}
    </button>
  );
};

export default InteractiveButton;
