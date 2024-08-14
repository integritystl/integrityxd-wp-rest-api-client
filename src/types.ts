import { AxiosResponse } from 'axios';

export interface DeleteResponse<T = any> {
  deleted: boolean;
  previous?: T;
  data?: T;
  [key: string]: any;
}

export interface AxiosLike {
  (config: any): Promise<AxiosResponse<any>>;
  request<T = any>(config: any): Promise<AxiosResponse<T>>;
  get<T = any>(url: string, config?: any): Promise<AxiosResponse<T>>;
  delete<T = any>(url: string, config?: any): Promise<AxiosResponse<T>>;
  head<T = any>(url: string, config?: any): Promise<AxiosResponse<T>>;
  options<T = any>(url: string, config?: any): Promise<AxiosResponse<T>>;
  post<T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>>;
  put<T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>>;
  patch<T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>>;
}
