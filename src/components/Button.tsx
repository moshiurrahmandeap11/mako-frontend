'use client';

import Link from 'next/link';
import React from 'react';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  variant?: 'outline' | 'filled';
}

export default function Button({
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  variant = 'outline',
  children,
}: ButtonProps) {
  const baseStyle =
    'px-5 py-2.5 font-bold text-xs tracking-[0.12em] rounded transition-all duration-300 uppercase select-none text-center inline-flex items-center justify-center';
  
  const variantStyles = {
    outline: 'bg-transparent text-amber-500 border border-amber-500/70 hover:bg-amber-500 hover:text-slate-950',
    filled: 'bg-amber-500 text-slate-950 border border-transparent hover:bg-amber-400 hover:text-slate-950',
  };

  const combinedClass = `${baseStyle} ${variantStyles[variant]} ${className} ${disabled ? 'opacity-50 pointer-events-none' : ''}`;

  if (href) {
    return (
      <Link href={href} className={combinedClass}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClass}
    >
      {children}
    </button>
  );
}
