import React from "react";
import { tools } from "../data";

export default function InfiniteScrollTools() {
  return (
    <div className="relative overflow-hidden py-8 bg-background">
      {/* Side gradient fades */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Infinite scroll row */}
      <div className="flex animate-scroll whitespace-nowrap w-max gap-6">
        {[...tools, ...tools].map((tool, index) => (
          <div
            key={index}
            className="min-w-[200px] h-28 rounded-2xl bg-muted shadow-lg flex flex-col justify-center items-center px-4 py-2 text-center transition-transform duration-300 hover:scale-105 bg-[var(--card)] whitespace-normal"
          >
            <img src={tool.icon} alt={tool.name} className="h-10 w-10 object-contain mb-2" />
            <p className="text-sm font-semibold text-foreground">{tool.name}</p>
            <span className="text-xs text-muted-foreground">{tool.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
