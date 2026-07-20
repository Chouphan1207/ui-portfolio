export interface NavLink {
  name: string;
  sectionId: string; // Đổi 'path' thành 'sectionId' để rõ ràng mục đích
}

export const NAV_LINKS: NavLink[] = [
  { name: 'About', sectionId: 'hero' },
  { name: 'Services', sectionId: 'services' },
  { name: 'Projects', sectionId: 'projects' },
  { name: 'Contact', sectionId: 'contact' }
];
