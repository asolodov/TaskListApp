export enum Status {
  Active = 0,
  Completed = 1
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


export interface ApiResponse<T> {
  data: T,
  errors: Error[]
}

export interface Error {
  message: string;
}
