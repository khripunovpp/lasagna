export interface ApiAgentInterface<ModelType> {
  get: (id: string) => Promise<ModelType>;
  getByField?: (field: string, value: any) => Promise<ModelType[] | null>;
  post: (data?: Record<string, any>) => Promise<ModelType>;
  postMany?: (data: any[]) => Promise<any>;
  put: (id: string, data?: Record<string, any>) => Promise<ModelType>;
  putMany?: (data: any[]) => Promise<any>;
  delete: (id: string) => Promise<void>;
}
