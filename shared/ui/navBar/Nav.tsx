'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from "clsx";
import { NAV_LINKS } from '@/shared/config/navigation'; // Adjust path based on your aliases

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className='hidden md:flex lg:flex items-center justify-end gap-6 ml-auto'>
      {NAV_LINKS.map((link, index) => (
        <Link
          href={link.path}
          key={index}
          className={clsx(
            "capitalize font-medium transition-all duration-200",
            link.path === pathname
              ? "text-[#33d4ff] border-b-2 border-text-color"
              : "text-neutral-800 hover:text-[#33d4ff]"
          )}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
