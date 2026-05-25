export type APIResponse<T extends object = object> = {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
};

export type AdminAPIResponse<T extends object = object> = {
  status: boolean;
  data?: T;
  error?: string;
};
