
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

  const handleClick = () => {
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

  const baseClasses = "inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-300 ease-out transform cursor-pointer";
  
  const variantClasses = {
    primary: "bg-vergreen-600 text-white hover:bg-vergreen-700 hover:scale-105 hover:shadow-lg active:scale-95 active:bg-vergreen-800",
    secondary: "bg-white text-vergreen-600 border border-vergreen-200 hover:bg-vergreen-600 hover:text-white hover:scale-105 hover:shadow-lg active:scale-95",
    ghost: "bg-transparent text-vergreen-600 hover:bg-vergreen-50 hover:scale-105 active:scale-95"
  };

  const sizeClasses = {
    default: "px-6 py-3 text-sm",
    large: "px-8 py-4 text-base"
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed hover:scale-100 hover:bg-gray-400" : "";

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabledClasses,
        className
      )}
    >
      {children}
    </button>
  );
};

export default InteractiveButton;
