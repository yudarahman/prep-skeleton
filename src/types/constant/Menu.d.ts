import type { LucideIcon } from 'lucide-react';

type ConsMenu = {
  id: string;
  title: string;
  url: string;
  icon: LucideIcon
};

type ConsMenus = {
  id: string;
  isExpanded: boolean | null;
  title: string;
  url: string;
  icon: LucideIcon;
  children: ConsMenu[];
};