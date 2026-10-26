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
    hidden: { opacity: 1 },
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
      opacity: 1,
      y: 0,
    },
  };

  const Wrapper = el as React.ElementType;

  return (
    <motion.div
      className={cn("block", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10%" }}
    >
      <Wrapper className={cn("block m-0", className)}>
        {words.map((word, index) => (
          <React.Fragment key={word.key}>
            <motion.span
              variants={child}
              className="inline-block"
            >
              {word.text}
            </motion.span>
            {index < words.length - 1 ? " " : null}
          </React.Fragment>
        ))}
      </Wrapper>
    </motion.div>
  );
}
