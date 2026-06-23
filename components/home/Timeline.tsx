// File Path: components/home/Timeline.tsx
"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // 🚀 Native ResizeObserver tracking prevents infinite rendering lags
  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Sets height only when actual physical layout measurements change
        setHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, []); // Run once to attach the listener safely

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-background font-sans md:px-10" ref={containerRef}>
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-5xl font-extrabold md:text-4xl mb-4 text-title max-w-4xl">
          My Past Journey
        </h2>
        <p className="text-description text-sm md:text-base max-w-sm">
          The past 4 years have been a journey of growth and creation. Here&apos;s the timeline.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20 space-y-5 md:space-y-10">
        {data.map((item) => (
          <div key={item.title} className="flex justify-start pt-10 md:pt-20 first:pt-0">
            {/* Desktop Left Side Sticky Title column */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-20 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full flex items-center justify-center bg-secondary">
                <div className="h-4 w-4 rounded-full border border-[var(--primary)] p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-primary">
                {item.title}
              </h3>
            </div>

            {/* Content Body column Layout */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-3xl mb-4 text-left font-bold text-title">
                {item.title}
              </h3>
              <div className="w-full">
                {item.content}
              </div>
            </div>
          </div>
        ))}

        {/* Animated Background Progress Indicator Spine Line */}
        <div
          style={{ height: `${height}px` }}
          className="absolute left-[31px] top-0 overflow-hidden w-[3px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[100%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
