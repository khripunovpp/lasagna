export interface ApiInterface {
  get: <T>(url: string, params?: Record<string, any>) => Promise<unknown>;
  post: <T>(url: string, data?: Record<string, any>) => Promise<unknown>;
  put: <T>(url: string, data?: Record<string, any>) => Promise<unknown>;
  delete: <T>(url: string) => Promise<T>;
  patch: <T>(url: string, data?: Record<string, any>) => Promise<unknown>;

  endpoint: string;
}
