export interface ApiAgentInterface<ModelType> {
  get: (id: string) => Promise<ModelType>;
  post: (data?: Record<string, any>) => Promise<ModelType>;
  put: (id: string, data?: Record<string, any>) => Promise<ModelType>;
  delete: (id: string) => Promise<void>;
}
