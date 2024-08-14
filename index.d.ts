import { AxiosInstance, AxiosResponse } from 'axios';
import { Buffer } from 'buffer';

export interface WordPressItem {
  [key: string]: unknown;
}

export interface WordPressAPI {
  insertItem(url: string, data: WordPressItem): Promise<AxiosResponse<WordPressItem>>;
  deleteItem(url: string): Promise<AxiosResponse<{ deleted: boolean }>>;
  forceDeleteItem(url: string): Promise<AxiosResponse<{ deleted: boolean }>>;
  updateItem(url: string, data: WordPressItem): Promise<AxiosResponse<WordPressItem>>;
  updateItemBuffer(url: string, data: Buffer, filename: string): Promise<AxiosResponse<WordPressItem>>;
  fetchAllItems(url: string, extraParams?: Record<string, unknown>): Promise<WordPressItem[]>;
}

export function createWordPressAPI(axiosInstance: AxiosInstance): WordPressAPI;
