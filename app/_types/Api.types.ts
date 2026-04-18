export type APIResponse<T extends object = object> = {
  success: boolean;
  data?: T;
  error?: string;
};
