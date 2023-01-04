interface IService<T> {
  login(obj: T): Promise<string>,
  create(obj: T): Promise<T>
}

export default IService;
