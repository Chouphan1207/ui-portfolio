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
      className={`relative flex-col inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${otherClasses}`}
    >
      {/* Spinning border gradient */}
      <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Button content */}
      <span className="relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-description gap-2 backdrop-blur-3xl">
        {position === 'left' && icon}
        {title}
        {position === 'right' && icon}
      </span>
    </button>
  );
};

export default MagicButton;
