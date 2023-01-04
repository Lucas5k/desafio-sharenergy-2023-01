interface IModel<T> {
  read(): Promise<T[]>,
  readOne(_id: string): Promise<T | null>,
  create(obj: T): Promise<T>,
  update(_id: string, obj: T): Promise<T | null>,
  delete(_id: string): Promise<T | null>,
}

export default IModel;
