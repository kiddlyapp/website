"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  animation?: Variants;
  delay?: number; // Add delay prop
}

const defaultAnimation: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children,
  className, 
  animation = defaultAnimation,
  delay = 0.5 // Default delay (adjust as needed based on text animation length)
}) => {
  return (
    <motion.div
      className={className}
      variants={animation}
      initial="hidden"
      animate="visible"
      transition={{ delay }} // Apply the delay here
    >
      {children}
    </motion.div>
  );
};

export default AnimatedButton; 