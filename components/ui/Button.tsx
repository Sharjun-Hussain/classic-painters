import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";

  const variants = {
    primary: "bg-nz-accent text-white hover:bg-sky-500 shadow-lg shadow-sky-900/20 hover:shadow-sky-900/40 hover:-translate-y-0.5 focus:ring-nz-accent",
    secondary: "bg-nz-blue text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40 hover:-translate-y-0.5 focus:ring-nz-blue",
    outline: "border-2 border-nz-accent text-nz-accent hover:bg-nz-accent hover:text-white focus:ring-nz-accent hover:shadow-md",
    ghost: "text-slate-600 hover:text-nz-accent hover:bg-slate-100 focus:ring-slate-400"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`group relative overflow-hidden ${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {/* Shine Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
    </button>
  );
};