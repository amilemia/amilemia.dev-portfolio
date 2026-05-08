"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  el?: keyof React.JSX.IntrinsicElements;
  once?: boolean;
}

export function AnimatedText({
  text,
  className,
  el = "p",
  once = true,
}: AnimatedTextProps) {
  // Split text into words, keeping spaces
  const words = text.split(" ").map((word, index) => ({
    text: word,
    key: `${word}-${index}`,
  }));

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  const Wrapper = el as React.ElementType;

  return (
    <motion.div
      className={cn("flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10%" }}
    >
      {/* We use a div here and then render the proper semantic tag inside if needed, but for text split we usually use spans inside the main wrapper */}
      <Wrapper className={cn("inline-flex flex-wrap m-0", className)}>
        {words.map((word) => (
          <motion.span
            variants={child}
            key={word.key}
            className="mr-2 last:mr-0 inline-block"
          >
            {word.text}
          </motion.span>
        ))}
      </Wrapper>
    </motion.div>
  );
}
