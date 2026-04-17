export interface PolicyPoint {
  label: string;
  description: string;
}

export interface PolicySection {
  title: string;
  points: PolicyPoint[];
}
