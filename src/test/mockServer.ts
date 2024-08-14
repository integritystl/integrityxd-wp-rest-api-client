import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

// Define types for our request bodies
interface PostData {
  title?: string;
  content?: string;
  [key: string]: unknown;
}

export const handlers = [
  // GET all posts
  http.get('http://localhost/wp-json/wp/v2/posts', ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? '1')
    const totalPages = 2

    let data
    if (page === 1) {
      data = [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }]
    } else {
      data = [{ id: 3, title: 'Post 3' }]
    }

    return HttpResponse.json(data, {
      headers: {
        'x-wp-totalpages': totalPages.toString()
      }
    })
  }),

  // GET a single post
  http.get('http://localhost/wp-json/wp/v2/posts/:id', ({ params }) => {
    return HttpResponse.json({ id: params.id, title: `Post ${params.id}` })
  }),

  // POST a new post
  http.post('http://localhost/wp-json/wp/v2/posts', async ({ request }) => {
    const body = await request.json() as PostData
    return HttpResponse.json({ id: Math.floor(Math.random() * 1000), ...body })
  }),

  // PUT (update) a post
  http.put('http://localhost/wp-json/wp/v2/posts/:id', async ({ params, request }) => {
    const body = await request.json() as PostData
    return HttpResponse.json({ id: Number(params.id), ...body })
  }),

  // DELETE a post
  http.delete('http://localhost/wp-json/wp/v2/posts/:id', ({ params }) => {
    return HttpResponse.json({ deleted: true, id: params.id })
  }),
]

export const server = setupServer(...handlers)
