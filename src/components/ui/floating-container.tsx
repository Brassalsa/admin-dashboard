"use client";
import { cn } from "@/lib/utils";
import { PropsDefault } from "@/types";
import {
  useScroll,
  motion,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import React, { useState } from "react";

function FloatingContainer(props: PropsDefault) {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  useMotionValueEvent(scrollYProgress, "change", (curr) => {
    if (typeof curr === "number") {
      let dir = curr - scrollYProgress.getPrevious()!;

      if (dir <= 0 || dir == curr) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
  });
  return (
    <AnimatePresence mode="wait">
      <motion.div
        {...props}
        className={cn("sticky top-0", props.className)}
        initial={{
          y: "-100%",
          opacity: 1,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
      />
    </AnimatePresence>
  );
}

export default FloatingContainer;
