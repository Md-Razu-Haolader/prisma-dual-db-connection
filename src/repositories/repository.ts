export type Criteria = {
  [propName: string]: any;
};

export interface SaveAble<T> {
  save: { (body: any): T | Promise<T> };
  saveMany: { (body: any): T[] | Promise<T[]> };
}
export interface FindableAble<T> {
  findOne(criteria: Criteria): T | Promise<T | null>;
  findById?: { (id: string | number): T | Promise<T | null> };
}
export interface UpdateAble<T> {
  update?: { (criteria: Criteria, body: any): Promise<T | never> };
  updateMany?: { (criteria: Criteria, body: any): Promise<T[] | never> };
}
interface Repository<T> extends SaveAble<T>, FindableAble<T>, UpdateAble<T> {}

export default Repository;
