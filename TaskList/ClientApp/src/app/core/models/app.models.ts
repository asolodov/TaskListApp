export enum Status {
  Active = "Active",
  Completed = "Completed"
}

export enum TaskListFilter {
  All = 0,
  Active = 1,
  Completed = 2
}

export interface Task {
  id: number,
  name: string,
  desctription?: string,
  status: Status,
  priority: number,
  dateAdded: Date,
  timeToComplete: Date
}

export interface AdaptiveDataStore {
  useLocalSource(): void;
  useRemoteSource(): void;
}

export interface ApiResponse<T> {
  value: T,
  errors: Error[]
}

export interface Error {
  message: string;
}
