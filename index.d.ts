import { AxiosInstance, AxiosResponse } from 'axios';
import { Buffer } from 'buffer';

export interface WordPressAPI {
  insertItem<T = any>(url: string, data: T): Promise<AxiosResponse<T>>;
  deleteItem(url: string): Promise<AxiosResponse<{ deleted: boolean }>>;
  forceDeleteItem(url: string): Promise<AxiosResponse<{ deleted: boolean }>>;
  updateItem<T = any>(url: string, data: Partial<T>): Promise<AxiosResponse<T>>;
  updateItemBuffer<T = any>(url: string, data: Buffer, filename: string): Promise<AxiosResponse<T>>;
  fetchAllItems<T = any>(url: string, extraParams?: Record<string, unknown>): Promise<T[]>;
}

export function createWordPressAPI(axiosInstance: AxiosInstance): WordPressAPI;
