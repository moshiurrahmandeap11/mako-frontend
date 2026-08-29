"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

export default function AuthTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // When switching between login & register, slide the entire screen horizontally
  const isRegister = pathname.includes("register");

  return (
    <div className="w-full min-h-screen overflow-hidden bg-surface-light relative">
      <motion.div
        key={pathname}
        initial={{
          x: isRegister ? "100vw" : "-100vw",
          opacity: 0.9,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        exit={{
          x: isRegister ? "-100vw" : "100vw",
          opacity: 0.9,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 32,
          mass: 0.7,
        }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </div>
  );
}
