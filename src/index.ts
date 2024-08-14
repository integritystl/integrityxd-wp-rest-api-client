import { AxiosResponse } from 'axios';
import { Buffer } from 'buffer';
import { DeleteResponse, AxiosLike } from './types';

export function createWordPressAPI(axiosInstance: AxiosLike) {
  return {
    async insertItem<T = any>(url: string, data: T): Promise<AxiosResponse<T>> {
      return axiosInstance.post(url, data);
    },

    async deleteItem<T = any>(url: string): Promise<AxiosResponse<DeleteResponse<T>>> {
      return axiosInstance.delete(url);
    },

    async forceDeleteItem<T = any>(url: string): Promise<AxiosResponse<DeleteResponse<T>>> {
      return axiosInstance.delete(url, { params: { force: true } });
    },

    async updateItem<T = any>(url: string, data: Partial<T>): Promise<AxiosResponse<T>> {
      return axiosInstance.put(url, data);
    },

    async updateItemBuffer<T = any>(url: string, data: Buffer, filename: string): Promise<AxiosResponse<T>> {
      const fileExtension = (filename.match(/\.([^.]+)$/) ?? ['jpg'])[0];
      const contentTypeMap: Record<string, string> = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        bmp: 'image/bmp',
        tiff: 'image/tiff',
        svg: 'image/svg+xml',
        webp: 'image/webp',
        heic: 'image/heic',
      };
      const contentType = contentTypeMap[fileExtension.toLowerCase()] || 'application/octet-stream';

      return axiosInstance.post(url, data, {
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename=${filename}`,
        },
      });
    },

    async fetchAllItems<T = any>(url: string, extraParams: Record<string, unknown> = {status: ['publish', 'future']}): Promise<T[]> {
      let allItems: T[] = [];
      let currentPage = 1;
      let totalPages = 1;

      while (currentPage <= totalPages) {
        const response = await axiosInstance.get<T[]>(url, {
          params: {
            page: currentPage,
            per_page: 100,
            ...extraParams,
          },
        });

        totalPages = Number(response.headers['x-wp-totalpages']);
        allItems = allItems.concat(response.data);
        currentPage++;
      }

      return allItems;
    }
  };
}
