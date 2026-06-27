import React from "react";
import { Timeline } from "@/components/home/Timeline";
import { timeline_projects } from "../data";
import "keen-slider/keen-slider.min.css";

export function RecentProjects() {
  // If timeline_projects is undefined or not an array, fall back to an empty array gracefully
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

        {/* ✨ FIX: Safely guard the images check with optional chaining */}
        {project?.images && project.images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {project.images.map((img, i) => (
              <img
                key={i}
                src={`/recent_projects/${img}.jpg`}
                alt={project?.altText ?? "Project screenshot"}
                className="w-full h-auto aspect-3/4 sm:aspect-2/3 rounded-[--radius] object-cover shadow-md border border-[--border]/10 dark:border-white/5"
              />
            ))}
          </div>
        )}

        {/* ✨ FIX: Safely handle the closing branch summary block */}
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
