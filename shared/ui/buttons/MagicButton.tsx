import React from 'react';

const MagicButton = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses = '',
}: {
  title: string;
  icon: React.ReactNode;
  position: 'left' | 'right';
  handleClick?: () => void;
  otherClasses?: string;
}) => {
  return (
    <button
      onClick={handleClick}
      className={`relative inline-flex h-12 overflow-hidden rounded-full p-[1.5px] transition-transform duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:ring-offset-[var(--background)] ${otherClasses}`}
    >
      {/* OPTIMIZED: Conic gradient spinning border tuned to your new ice-blue palette */}
      <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--accent)_0%,var(--primary)_50%,var(--accent)_100%)] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

      {/* OPTIMIZED: Clean background and text contrast mapping */}
      <span className="relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[var(--card)] px-6 text-sm font-semibold text-[var(--foreground)] gap-2 backdrop-blur-3xl transition-colors duration-300 border border-[var(--border)]/10">
        {position === 'left' && icon}
        {title}
        {position === 'right' && icon}
      </span>
    </button>
  );
};

export default MagicButton;
