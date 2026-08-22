"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";

export interface ButtonProps {
  href?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "filled" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  href,
  onClick,
  type = "button",
  disabled = false,
  isLoading = false,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  className = "",
  children,
}: ButtonProps) {
  // Normalize alias variants
  const normalizedVariant =
    variant === "filled"
      ? "primary"
      : variant === "outline"
        ? "secondary"
        : variant;

  const baseStyle =
    "inline-flex items-center justify-center gap-2  tracking-wider rounded-md transition-all duration-200 select-none text-center focus:outline-none focus:ring-2 focus:ring-[#39FF88]/40 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-[11px]",
    md: "px-5 py-2.5 text-xs",
    lg: "px-7 py-3 text-sm",
  };

  const variantStyles = {
    primary:
      "bg-[#39FF88] text-[#0B132B] hover:bg-[#00CC66]  active:scale-[0.98]",
    secondary:
      "bg-transparent text-[#39FF88] border hover:bg-[#39FF88] hover:text-[#0B132B] active:scale-[0.98]",
    ghost:
      "bg-transparent text-slate-300 hover:text-[#39FF88] hover:bg-[#39FF88]/10 border border-transparent",
    danger:
      "bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500 hover:text-white active:scale-[0.98]",
  };

  const combinedClass = `${baseStyle} ${sizeStyles[size]} ${variantStyles[normalizedVariant]} ${className}`;

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        icon &&
        iconPosition === "left" && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === "right" && (
        <span className="shrink-0">{icon}</span>
      )}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} onClick={onClick} className={combinedClass}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={combinedClass}
    >
      {content}
    </button>
  );
}
