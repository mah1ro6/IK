type Reference<T, R> = T extends "get" ? R : string | null;
interface GetsType<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}
type DateType = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};
type Structure<T, P> = T extends "get"
  ? { id: string } & DateType & Required<P>
  : T extends "gets"
  ? GetsType<{ id: string } & DateType & Required<P>>
  : Partial<DateType> & (T extends "patch" ? Partial<P> : P);

export type contents<T = "get"> = Structure<
  T,
  {
    name?: string;
    type?: string;
    rank?: string;
    origin?: string;
    variety?: string;
    taste?: string;
    producer?: string;
    image?: string;
    remarks?: string;
  }
>;

export interface EndPoints {
  get: {
    contents: contents<"get">;
  };
  gets: {
    contents: contents<"gets">
  };
  post: {};
  put: {};
  patch: {};
  delete: {
    contents: contents<"delete">;
  };
}
