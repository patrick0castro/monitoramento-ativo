export interface Stock {
  title: string;
  subtitle?: string;
  value: number;
  percent?: number;
  valueMin: number;
  valueMax: number;
  date: Date;
}
