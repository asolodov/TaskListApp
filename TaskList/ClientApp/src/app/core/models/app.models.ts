export enum Status {
  Active = 0,
  Completed = 1
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
  error: Error
}

export interface Error {
  message: string;
}
