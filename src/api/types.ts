export interface ApiResponse<T = any> {
  data?: T | null;
  message: string;
  status: number;
  hasError: boolean;
}
