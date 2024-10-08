import { AxiosResponse } from 'axios';
import { Buffer } from 'buffer';

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

export interface WordPressAPI {
  insertItem<T = any>(url: string, data: T): Promise<AxiosResponse<T>>;
  deleteItem<T = any>(url: string): Promise<AxiosResponse<DeleteResponse<T>>>;
  forceDeleteItem<T = any>(url: string): Promise<AxiosResponse<DeleteResponse<T>>>;
  updateItem<T = any>(url: string, data: Partial<T>): Promise<AxiosResponse<T>>;
  updateItemBuffer<T = any>(url: string, data: Buffer, filename: string): Promise<AxiosResponse<T>>;
  fetchAllItems<T = any>(url: string, extraParams?: Record<string, unknown>): Promise<T[]>;
}

export function createWordPressAPI(axiosInstance: AxiosLike): WordPressAPI;
