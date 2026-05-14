export type APIResponse<T extends object = object> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type AdminAPIResponse<T extends object = object> = {
  status: boolean;
  data?: T;
  error?: string;
};
