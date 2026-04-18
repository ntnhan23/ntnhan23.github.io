import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.jsx'
import { getAllPosts } from './utils/markdownParser'

export function render(url) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url} basename={import.meta.env.BASE_URL || '/'}>
        <App />
      </StaticRouter>
    </StrictMode>
  )
  return { html }
}

export function getRoutes() {
  const posts = getAllPosts();
  return ['/', '/blog', ...posts.map(p => `/blog/${p.slug}`)];
}
