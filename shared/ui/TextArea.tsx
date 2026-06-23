"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "motion/react";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, forwardedRef) => {
    const radius = 120;
    const [visible, setVisible] = React.useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const localRef = React.useRef<HTMLTextAreaElement>(null);
    const ref = (el: HTMLTextAreaElement) => {
      localRef.current = el;
      if (typeof forwardedRef === "function") {
        forwardedRef(el);
      } else if (forwardedRef) {
        forwardedRef.current = el;
      }
    };

    const handleInput = () => {
      const el = localRef.current;
      if (el) {
        el.style.height = "auto"; // Reset first
        el.style.height = `${el.scrollHeight}px`; // Set to scroll height
      }
    };

    function handleMouseMove({
      currentTarget,
      clientX,
      clientY,
    }: React.MouseEvent<HTMLDivElement>) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${visible ? radius + "px" : "2px"} circle at ${mouseX}px ${mouseY}px,
              #3f90fc,
              transparent 80%
            )
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/textarea rounded-lg p-[2px] transition duration-300"
      >
        <textarea
          ref={ref}
          rows={1}
          onInput={handleInput}
          className={cn(
            `shadow-input dark:placeholder-text-neutral-600 flex w-full resize-none overflow-hidden rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black transition duration-400 group-hover/textarea:shadow-none placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600`,
            className
          )}
          {...props}
        />
      </motion.div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
