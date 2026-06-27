"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/utils/cn";
import { useLoading } from "@/lib/loading/loading-context";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const { isLoadingDone } = useLoading();
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (!isLoadingDone) return;

    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ?? 1,
        delay: stagger(0.4),
      }
    );
  }, [isLoadingDone]);

  return (
    <div className={cn("font-bold", className)}>
      <div className="my-3">
        <div className="leading-snug tracking-wide">
          <motion.div ref={scope}>
            {wordsArray.map((word, idx) => (
              <motion.span
                key={word + idx}
                className={`${idx > 2
                  ? "bg-linear-to-b from-primary to-secondary text-transparent bg-clip-text"
                  : "text-title"} opacity-0`}
                style={{ filter: filter ? "blur(10px)" : "none" }}
              >
                {word}{" "}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
