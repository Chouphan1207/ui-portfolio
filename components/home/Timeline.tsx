"use client";
import { useScroll, useTransform, motion } from "framer-motion"; // Adjusted to matching standard framer-motion library bounds
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Native ResizeObserver tracking prevents infinite rendering lags
  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 50%", "end 100%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 2]);

  return (
    <div className="w-full bg-background font-sans px-4 md:px-10" ref={containerRef}>
      {/* Header Info Block */}
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-title max-w-4xl">
          My Past Journey
        </h2>
        <p className="text-description text-sm md:text-base max-w-md">
          The past 4 years have been a journey of growth and creation. Here&apos;s the timeline.
        </p>
      </div>

      {/* Main Timeline Stream Container */}
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20 space-y-12">
        {data.map((item) => (
          <div key={item.title} className="flex flex-col md:flex-row justify-start pt-10 md:pt-16 first:pt-0">

            {/* OPTIMIZED: Left Column - Interactive Dot & Sticky Timestamp */}
            {/* We reduced max-w and padded correctly so text stays perfectly left-anchored */}
            <div className="sticky flex items-center md:items-start z-40 top-24 self-start w-full md:w-1/4 lg:w-1/5">
              {/* Timeline Indicator Dot */}
              <div className="h-8 w-8 absolute left-3 rounded-full flex items-center justify-center bg-[var(--card)] border border-[var(--border)] shadow-xs dark:border-white/10">
                <div className="h-3 w-3 rounded-full bg-[--primary] animate-pulse" />
              </div>

              {/* Desktop Sticky Date Title */}
              <h3 className="hidden md:block text-2xl lg:text-3xl pl-16 font-extrabold text-[var(--title)] tracking-tight">
                {item.title}
              </h3>
            </div>

            {/* OPTIMIZED: Right Column - Dynamic Card & Picture Layout Canvas */}
            {/* Removing old md:pl-4 and defining clear flex width pulls everything smoothly to the left */}
            <div className="relative pl-16 pr-4 md:pl-4 w-full md:flex-1">
              {/* Mobile Only Floating Timestamp Title */}
              <h3 className="md:hidden block text-2xl mb-3 font-bold text-title text-left">
                {item.title}
              </h3>

              <div className="w-full transition-transform duration-300 hover:translate-x-1">
                {item.content}
              </div>
            </div>

          </div>
        ))}

        {/* Animated Background Progress Indicator Spine Line */}
        <div
          style={{ height: `${height}px` }}
          className="absolute left-[27px] top-0 overflow-hidden w-[2px] bg-neutral-200 dark:bg-neutral-800/60"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-full bg-gradient-to-b from-[var(--primary)] via-[var(--secondary)] to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
