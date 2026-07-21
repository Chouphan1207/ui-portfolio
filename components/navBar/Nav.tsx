'use client';

import clsx from "clsx";
import { NAV_LINKS } from '@/app/config/navigation';

const Nav = () => {
  // Hàm cuộn mượt mà
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className='hidden md:flex lg:flex items-center justify-end gap-6 ml-auto'>
      {NAV_LINKS.map((link) => (
        <button
          key={link.sectionId} // Sử dụng sectionId làm key duy nhất thay vì index
          onClick={() => scrollToSection(link.sectionId)}
          className={clsx(
            "capitalize font-medium transition-all duration-200",
            "text-title hover:text-[#33d4ff]" // Style mặc định
          )}
        >
          {link.name}
        </button>
      ))}
    </nav>
  );
};

export default Nav;
