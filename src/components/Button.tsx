"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";

export interface ButtonProps {
  href?: string;
  target?: string;
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
  target,
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
    "inline-flex items-center justify-center gap-2 tracking-wide rounded-lg transition-all duration-200 select-none text-center focus:outline-none focus:ring-2 focus:ring-[#1dbf73]/40 disabled:opacity-50 disabled:pointer-events-none cursor-pointer font-medium whitespace-nowrap";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3 text-base",
  };

  const variantStyles = {
    primary:
      "bg-[#1dbf73] text-white hover:bg-[#19a463] shadow-xs active:scale-[0.98] font-medium",
    secondary:
      "bg-transparent text-[#1f2429] border border-[#1f2429]/15 hover:border-[#1dbf73] hover:text-[#1dbf73] hover:bg-black/[0.02] active:scale-[0.98] font-medium",
    ghost:
      "bg-transparent text-[#6e797b] hover:text-[#1dbf73] hover:bg-black/[0.03] border border-transparent",
    danger:
      "bg-rose-500/10 text-rose-500 border border-rose-500/30 hover:bg-rose-500 hover:text-white active:scale-[0.98]",
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
      <Link
        href={href}
        target={target}
        onClick={onClick}
        className={combinedClass}
      >
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
