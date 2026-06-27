import React from "react";
import { Timeline } from "@/components/home/Timeline";
import "keen-slider/keen-slider.min.css"

export function RecentProjects() {
  const data = [
    {
      title: "2019 - 2020",
      content: (
        <div>
          <h4 className="text-lg font-bold text-[--title] mb-1">
            Market Research Assistant — INTAGE Vietnam
          </h4>
          <p className="mb-6 text-sm md:text-base font-normal text-[--title] max-w-2xl leading-relaxed">
            Managed and verified high-volume consumer datasets. Designed structured research questionnaires and worked with data analysts to translate raw survey numbers into clear trend reports for corporate clients.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {[].map((img, i) => (
              <img
                key={i}
                src={`/recent_projects/${img}.jpg`}
                alt="Market Research Work"
                className="w-full h-auto aspect-3/4 sm:aspect-[2/3] rounded-[var(--radius)] object-cover shadow-sm border border-[var(--border)]/10 dark:border-white/5"
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Late 2022",
      content: (
        <div>
          <h4 className="text-lg font-bold text-[--title] mb-1">
            Guitar Store App — University Capstone Project
          </h4>
          <p className="mb-6 text-sm md:text-base font-normal text-[--title] max-w-2xl leading-relaxed">
            Built a cross-platform e-commerce shop using Flutter and Dart featuring item filtering, real-time cart synchronization, and secure checkout. Integrated a real-time, microphone-based guitar tuner and anchored the app with a backend powered by PHP, Laravel, and MySQL.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {["rp1", "rp3", "rp6", "rp2"].map((img, i) => (
              <img
                key={i}
                src={`/recent_projects/${img}.jpg`}
                alt="Guitar Shop Project Screenshot"
                className="w-full h-auto aspect-3/4 sm:aspect-2/3 rounded-[--radius] object-cover shadow-md border border-[--border]/10 dark:border-white/5"
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <h4 className="text-lg font-bold text-[--title] mb-1">
            Graduation & Full-Stack Intern — PHARMATECH
          </h4>
          <p className="mb-6 text-sm md:text-base font-normal text-[--title] max-w-2xl leading-relaxed">
            Graduated with a Bachelor of IT (Software Development) and achieved a 7.0 IELTS score. Simultaneously completed a full-stack internship at PHARMATECH, where I maintained internal platforms, squashed bugs, and customized functional plugins.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {["graduation2", "graduation", "ielts", "blog7"].map((img, i) => (
              <img
                key={i}
                src={`/recent_projects/${img}.jpg`}
                alt="2023 Achievements"
                className="w-full h-auto aspect-3/4 sm:aspect-2/3 rounded-[--radius] object-cover shadow-sm border border-[--border]/10 dark:border-white/5"
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "2023 - 2026",
      content: (
        <div>
          <h4 className="text-lg font-bold text-[--title] mb-1">
            Mandatory National Military Service
          </h4>
          <p className="mb-6 text-sm md:text-base font-normal text-[--title] max-w-2xl leading-relaxed">
            Led squads under high-pressure environments while handling combat medic responsibilities. Spearheaded secure administrative documentation control, modernizing old paper logs into efficient, highly secure Excel tracker sheets.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {["duty1", "duty2", "duty3", "duty4", "duty5", "medic4", "medic2", "medic1"].map((img, i) => (
              <img
                key={i}
                src={`/recent_projects/${img}.jpg`}
                alt="Military Service Records"
                className="w-full h-auto aspect-3/4 sm:aspect-2/3 rounded-[--radius] object-cover shadow-sm border border-[--border]/10 dark:border-white/5"
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "2025 - Present",
      content: (
        <div>
          <h4 className="text-lg font-bold text-[--title] mb-1">
            Personal Portfolio Space
          </h4>
          <p className="mb-6 text-sm md:text-base font-normal text-[--title] max-w-2xl leading-relaxed">
            Architected a high-performance developer portfolio using Next.js and TypeScript. Integrated Redux Toolkit for global state and layout theme switching, added an interactive blogging feed with custom dynamic routes, and styled the UI with Tailwind CSS before deploying live on Vercel.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {[].map((img, i) => (
              <img
                key={i}
                src={`/recent_projects/${img}.jpg`}
                alt="Next.js Portfolio Setup"
                className="w-full h-auto aspect-3/4 sm:aspect-2/3 rounded-[--radius] object-cover shadow-sm border border-[--border]/10 dark:border-white/5"
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Present",
      content: (
        <div>
          <h4 className="text-lg font-bold text-[--title] mb-2">
            Full-Stack Productivity App & Current Chapter
          </h4>
          <p className="mb-6 text-sm md:text-base font-normal text-[--title] max-w-2xl leading-relaxed">
            Building a cross-platform app utilizing Feature-Sliced Design (FSD) architecture in Flutter. Developed user authentication via JWT, local offline synchronization workflows, and a fast custom API backend using Node.js, Express, Prisma ORM, and Neon PostgreSQL.
          </p>

          <div className="max-w-3xl mt-6 pt-4 border-t border-[--border]/20">
            <p className="text-xl md:text-2xl font-semibold text-transparent leading-relaxed tracking-tight bg-linear-to-r from-[--title] via-[--foreground] to-[--muted-foreground] bg-clip-text">
              With my military duty complete, I am looking for full-time development opportunities where I can solve production engineering challenges, write maintainable code, and deliver immediate value within an agile team.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}

export default RecentProjects;
