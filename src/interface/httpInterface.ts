export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  time: string | number;
  image: string;
}

export interface CustomError extends Error {
  info?: string;
  code?: number | string;
}
export type EventCreation = Omit<Event, "id">;
