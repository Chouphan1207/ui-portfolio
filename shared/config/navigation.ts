export interface NavLink {
  name: string;
  path: string;
}

export const NAV_LINKS: NavLink[] = [
  { name: 'About', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];
