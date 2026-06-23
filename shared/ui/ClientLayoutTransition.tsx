"use client";

import { useState, useEffect } from "react";

export default function ClientLayoutTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transition-opacity duration-700 ${
        showContent ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {children}
    </div>
  );
}