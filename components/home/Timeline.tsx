"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

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
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-[--ring] max-w-4xl">
          My Past Journey
        </h2>
        <p className="text-description text-sm md:text-base max-w-md">
          The past 4 years have been a journey of growth and creation. Here&apos;s the timeline.
        </p>
      </div>

      {/* Main Timeline Stream Container */}
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20 space-y-12">
        {data.map((item) => (
          /* ✨ FIX: Changed from flex flex-col md:flex-row to a structured grid layout */
          <div key={item.title} className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] gap-4 pt-10 md:pt-16 first:pt-0">

            {/* Left Column - Interactive Dot & Sticky Timestamp */}
            <div className="sticky flex items-center md:items-start z-40 top-24 self-start w-full">
              {/* Timeline Indicator Dot */}
              <div className="h-8 w-8 absolute left-3 rounded-full flex items-center justify-center bg-primary border border-[--border] shadow-xs dark:border-white/10">
                <div className="h-3 w-3 rounded-full bg-[--foreground] animate-pulse" />
              </div>

              <h3 className="hidden md:block text-2xl lg:text-3xl pl-16 font-extrabold text-primary tracking-tight">
                {item.title}
              </h3>
            </div>

            {/* Right Column - Dynamic Card Canvas */}
            <div className="relative pl-16 pr-4 md:pl-0 w-full">
              {/* Mobile Only Floating Timestamp Title */}
              <h3 className="md:hidden block text-2xl mb-3 font-bold text-[--ring] text-left">
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
          className="absolute left-6.75 top-0 overflow-hidden w-0.5 bg-transparent"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-full bg-linear-to-b from-(--primary) via-(--secondary) to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
