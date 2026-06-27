import React from 'react';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

type SocialItem = {
  name: string;
  url: string;
  icon: React.ReactNode;
  wrapperClass: string;
};

const socials: SocialItem[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/Chouphan1207',
    icon: <FaGithub className="w-5 h-5 transition-colors duration-300 group-hover:text-[#6e5494]" />,
    wrapperClass: 'hover:border-[#6e5494]',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/tin-phan-hoang-trong-110a2422a/',
    icon: <FaLinkedin className="w-5 h-5 transition-colors duration-300 group-hover:text-[#0073ae]" />,
    wrapperClass: 'hover:border-[#0073ae]',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/tedsphan/',
    icon: <FaInstagram className="w-5 h-5 transition-colors duration-300 group-hover:text-[#FD1D1D]" />,
    wrapperClass: 'hover:border-[#FD1D1D]',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/tedsphan',
    icon: <FaFacebook className="w-5 h-5 transition-colors duration-300 group-hover:text-[#1773ea]" />,
    wrapperClass: 'hover:border-[#1773ea]',
  },
];

const SocialButtons = () => {
  return (
    // FIXED: Cleaned up a syntax error in the middle of your layout padding properties ("sm:pl-5 0")
    <div className="flex items-center gap-4 pl-0 pt-5 sm:pl-5 sm:pt-0">
      {socials.map(({ name, url, icon, wrapperClass }) => (
        <div key={name} className="group relative">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block p-[2px] rounded-full transition-all duration-300 active:scale-95 border-2 border-transparent hover:scale-110 ${wrapperClass}`}
          >
            {/* OPTIMIZED: Changed bg layer to target the component container card variables so brand icons pop out */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] shadow-xs transition-all duration-300 group-hover:shadow-md dark:border-white/5">
              {icon}
            </div>
          </a>

          {/* Tooltip */}
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 bg-[var(--popover)] text-[var(--foreground)] border border-[var(--border)] text-xs font-medium px-2.5 py-1 rounded-md shadow-xs pointer-events-none z-50">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SocialButtons;
