export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
}

export type FilterConfig =
  | { type: "search"; key: string; placeholder?: string }
  | {
      type: "date";
      key: string;
    }
  | { type: "time"; key: string };

export type PaginationProps = {
  page: number;
  total: number;
  limit?: number;
  onPageChange: (page: number) => void;
};
