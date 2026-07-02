"use client"

import React, { useRef, useState } from "react";
import { Timeline } from "@/components/home/Timeline";
import { timeline_projects } from "../data";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import "keen-slider/keen-slider.min.css";

// 1. Create an isolated sub-component for the parallax calculation
function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Track the scroll progress of this image relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Shift the image vertically inside its container as you scroll past
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <>
      {/* Inline Grid Image Wrapper */}
      <div
        ref={containerRef}
        onClick={() => setIsOpen(true)}
        className="w-full h-auto aspect-3/4 sm:aspect-2/3 rounded-[--radius] overflow-hidden shadow-md border border-[--border]/10 dark:border-white/5 relative cursor-zoom-in"
      >
        <motion.img
          src={src}
          alt={alt}
          style={{ y }}
          className="absolute inset-0 w-full h-full object-cover scale-120 origin-center transition-opacity hover:opacity-90"
        />
      </div>

      {/* Full-screen Zoom Modal Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs cursor-zoom-out p-4 md:p-10"
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-white text-3xl font-light hover:scale-110 transition-transform"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>

            {/* The Fully Zoomed Image */}
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain rounded-md shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function RecentProjects() {
  const safeProjects = timeline_projects ?? [];

  const mappedTimelineData = safeProjects.map((project) => ({
    title: project?.title ?? "Present",
    content: (
      <div>
        <h4 className="text-lg font-bold text-[--ring] mb-1">
          {project?.heading ?? ""}
        </h4>
        <p className="mb-6 text-sm md:text-base font-normal text-[--ring] max-w-2xl leading-relaxed">
          {project?.description ?? ""}
        </p>

        {project?.images && project.images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {project.images.map((img, i) => (
              <ParallaxImage
                key={i}
                src={`/recent_projects/${img}.jpg`}
                alt={project?.altText ?? "Project screenshot"}
              />
            ))}
          </div>
        )}

        {project?.isClosingBranch && (
          <div className="max-w-3xl mt-6 pt-4 border-t border-[--border]/20">
            <p className="text-xl md:text-2xl font-semibold text-accent leading-relaxed tracking-tight bg-linear-to-r from-[--title] via-[--foreground] to-[--muted-foreground] bg-clip-text">
              With my military duty complete, I am looking for full-time development opportunities where I can solve production engineering challenges, write maintainable code, and deliver immediate value within an agile team.
            </p>
          </div>
        )}
      </div>
    ),
  }));

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={mappedTimelineData} />
    </div>
  );
}

export default RecentProjects;
