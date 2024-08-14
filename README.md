# @integrityxd/wp-rest-api-client

This package provides a typed, low-level interface for interacting with the WordPress REST API using a functional approach. It uses Axios for making HTTP requests.

## Installation

```bash
npm install @integrityxd/wp-rest-api-client axios
```

## Usage

Import the necessary functions and types:

```typescript
import axios from 'axios';
import { createWordPressAPI } from 'wordpress-rest-api';
```

Create an Axios instance and initialize the API:

```typescript
const axiosInstance = axios.create({
  baseURL: 'https://your-wordpress-site.com/wp-json/wp/v2',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_AUTH_TOKEN'
  }
});

const wpApi = createWordPressAPI(axiosInstance);
```

Use the API methods:

```typescript
// Fetch all posts
const posts = await wpApi.fetchAllItems('/posts');

// Insert a new post
const newPost = await wpApi.insertItem('/posts', { 
  title: 'New Post', 
  content: 'Post content', 
  status: 'publish' 
});

// Update a post
const updatedPost = await wpApi.updateItem(`/posts/${newPost.data.id}`, { 
  title: 'Updated Post Title' 
});

// Delete a post
await wpApi.deleteItem(`/posts/${newPost.data.id}`);
```

## API Methods

- `insertItem(url: string, data: WordPressItem): Promise<AxiosResponse<WordPressItem>>`
- `deleteItem(url: string): Promise<AxiosResponse<{ deleted: boolean }>>`
- `forceDeleteItem(url: string): Promise<AxiosResponse<{ deleted: boolean }>>`
- `updateItem(url: string, data: WordPressItem): Promise<AxiosResponse<WordPressItem>>`
- `updateItemBuffer(url: string, data: Buffer, filename: string): Promise<AxiosResponse<WordPressItem>>`
- `fetchAllItems(url: string, extraParams?: Record<string, unknown>): Promise<WordPressItem[]>`

All methods use the provided Axios instance for making requests.

## Types

```typescript
interface WordPressItem {
  [key: string]: unknown;
}
```

## Customizing Axios Instance

You can customize the Axios instance before passing it to `createWordPressAPI`. This allows you to:

- Set custom headers
- Configure request timeouts
- Add request or response interceptors
- Set up custom authentication

Example of a custom Axios instance:

```typescript
const axiosInstance = axios.create({
  baseURL: 'https://your-wordpress-site.com/wp-json/wp/v2',
  timeout: 10000,
  headers: {'X-Custom-Header': 'foobar'}
});

axiosInstance.interceptors.request.use((config) => {
  // Modify config before request is sent
  return config;
});

const wpApi = createWordPressAPI(axiosInstance);
```

For more detailed documentation on Axios configuration, please refer to the [Axios documentation](https://axios-http.com/docs/config_defaults).

## Development

To set up the development environment:

1. Clone the repository
2. Run `npm install`
3. Run `npm run test` to run the test suite
4. Run `npm run lint` to lint the code

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
