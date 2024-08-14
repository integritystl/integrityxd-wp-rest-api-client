import { createWordPressAPI } from '../index'
import axios from 'axios'

describe('WordPress API', () => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost/wp-json/wp/v2'
  })
  const wpApi = createWordPressAPI(axiosInstance)

  test('insertItem should make a POST request', async () => {
    const mockData = { title: 'Test Post' }
    const result = await wpApi.insertItem('/posts', mockData)

    expect(result.data).toHaveProperty('id')
    expect(result.data.title).toBe('Test Post')
  })

  test('deleteItem should make a DELETE request', async () => {
    const result = await wpApi.deleteItem('/posts/1')

    expect(result.data).toEqual({ deleted: true, id: '1' })
  })

  test('updateItem should make a PUT request', async () => {
    const mockData = { title: 'Updated Post' }
    const result = await wpApi.updateItem('/posts/1', mockData)

    expect(result.data).toHaveProperty('id', 1)
    expect(result.data.title).toBe('Updated Post')
  })

  test('fetchAllItems should handle pagination', async () => {
    const result = await wpApi.fetchAllItems('/posts')

    expect(result).toHaveLength(3)
    expect(result[0]).toHaveProperty('id', 1)
    expect(result[1]).toHaveProperty('id', 2)
    expect(result[2]).toHaveProperty('id', 3)
  })
})
