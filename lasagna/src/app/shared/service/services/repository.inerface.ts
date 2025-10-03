export interface RepositoryInterface<ModelType> {
  getOne: (id: string) => Promise<unknown>
  getAll: () => Promise<unknown>
  addOne: (data: ModelType) => Promise<unknown>
  editOne: (id: string, data: ModelType) => Promise<unknown>
  replaceOne: (id: string, data: ModelType) => Promise<unknown>
  deleteOne: (id: string) => Promise<unknown>
  deleteMany: (ids: string[]) => Promise<unknown>
}
