export interface RepositoryInterface<ModelType> {
  getOne: (id: string) => Promise<any>
  getAll: () => Promise<any>
  addOne: (data: ModelType) => Promise<any>
  updateOne: (id: string, data: ModelType) => Promise<any>
  deleteOne: (...args: any[]) => Promise<any>
  deleteMany: (ids: string[]) => Promise<any>
}
