import React from 'react';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin,  } from 'react-icons/fa';

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
    icon: <FaGithub className="w-6 h-6 group-hover:text-[#6e5494]" />,
    wrapperClass: 'hover:border-[#6e5494] ',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/tin-phan-hoang-trong-110a2422a/',
    icon: <FaLinkedin className="w-6 h-6 group-hover:text-[#0073ae]" />,
    wrapperClass: 'group-hover:border-[#0073ae]',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/tedsphan/',
    icon: <FaInstagram className="w-6 h-6 group-hover:text-[#FD1D1D]" />,
    wrapperClass: 'group-hover:border-[#FD1D1D]',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/tedsphan',
    icon: <FaFacebook className="w-6 h-6 group-hover:text-[#1773ea]" />,
    wrapperClass: 'group-hover:border-[#1773ea]',
  },
];

const SocialButtons = () => {
  return (
    <div className="flex items-center gap-6 pl-0 pt-5 sm:pl-5 0 sm:pt-0">
      {socials.map(({ name, url, icon, wrapperClass }) => (
        <div key={name} className="group relative">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block p-[1px] rounded-full transition-all border-3 border-transparent duration-300 hover:scale-110  ${wrapperClass}`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary transition-colors duration-300">
              {icon}
            </div>
          </a>

          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 bg-[var(--card)] text-primary text-sm font-medium px-3 py-1 rounded-md shadow-md whitespace-nowrap pointer-events-none">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SocialButtons;