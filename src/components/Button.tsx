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
    'px-5 py-2.5 font-extrabold text-xs tracking-[0.12em] rounded-lg transition-all duration-300 uppercase select-none text-center inline-flex items-center justify-center';
  
  const variantStyles = {
    outline: 'bg-transparent text-[#39FF88] border border-[#39FF88]/60 hover:bg-[#39FF88] hover:text-[#0B132B] shadow-md shadow-[#39FF88]/10',
    filled: 'bg-[#39FF88] text-[#0B132B] border border-transparent hover:bg-[#00CC66] shadow-lg shadow-[#39FF88]/20',
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
