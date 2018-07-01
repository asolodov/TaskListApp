export enum Status {
  Actvie,
  Completed
}

export interface Task {
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
