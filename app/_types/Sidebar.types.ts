export type SidebarItem = {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: SidebarItem[];
  disabled?: boolean;
  roles?: string[]; // For future-proofing access control
};
