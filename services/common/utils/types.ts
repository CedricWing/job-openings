// Here we define the various types used across different services
export type Position = { name: string; count: number; active: boolean };
export type JobOpenings = Array<{
  name: string;
  jobs: Array<Position>;
  active: boolean;
}>;
