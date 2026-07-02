"use client"

import React, { useRef, useState } from "react";
import { Timeline } from "@/components/home/Timeline";
import { timeline_projects } from "../data";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/ui/buttons/button"; // 👈 Your custom Button imported here
import "keen-slider/keen-slider.min.css";

// Isolated sub-component for the parallax calculation
function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <>
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs cursor-zoom-out p-4 md:p-10"
          >
            <button
              className="absolute top-6 right-6 text-primary text-3xl font-light hover:scale-110 transition-transform"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>

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

        <p className="mb-4 text-sm md:text-base font-normal text-[--ring] max-w-2xl leading-relaxed">
          {project?.description ?? ""}
        </p>

        {/* Dynamic Project Directory Link Button via custom Button UI */}
        {project?.link && (
          <div className="mb-6">
            <Button
              asChild
              variant="outline"
              size="default"
              className="group cursor-pointer bg-popover hover:border-[#238636] hover:text-[#238636] hover:bg-[#238636]/5 dark:hover:bg-[#238636]/10 transition-colors duration-200"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>View Project Directory</span>
                <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="transition-transform duration-200 group-hover:scale-110"
                        >
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                        </svg>
              </a>
            </Button>
          </div>
        )}

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
