"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  animation?: Variants;
  staggerChildren?: number;
}

const defaultAnimation: Variants = {
  hidden: { 
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text,
  className,
  animation = defaultAnimation,
  staggerChildren = 0.04, // Default stagger delay
}) => {
  const words = text.split(" ");

  return (
    <motion.div
      className={className} 
      variants={{ 
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
          opacity: 1,
          transition: { staggerChildren, delayChildren: 0.04 * i },
        }),
      }}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span 
          key={index} 
          variants={animation} 
          style={{ display: "inline-block", marginRight: "0.25em" }} // Add space between words
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText; 