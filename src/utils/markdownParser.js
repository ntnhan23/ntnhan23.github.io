/**
 * Parses markdown content with frontmatter into an object.
 * Format of frontmatter must be standard YAML enclosed in `---`
 */
export function parseFrontmatter(fileName, markdownContent) {
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(markdownContent);
  const data = {};
  let content = markdownContent;

  if (match) {
    const fmString = match[1];
    fmString.split('\n').forEach(line => {
      // Split by first colon
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();
        // Remove surrounding quotes if they exist
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.substring(1, value.length - 1);
        }
        data[key] = value;
      }
    });

    if (data.tags) {
      data.tags = typeof data.tags === 'string' ? data.tags.split(',').map(t => t.replace(/"/g, '').trim()) : data.tags;
    }

    // Remove the frontmatter block from content
    content = markdownContent.replace(match[0], '').trim();
  }
  
  // Extract slug from filename (e.g., './optimizing-dfs.md' -> 'optimizing-dfs')
  // Depending on how import.meta.glob returns keys, it might be an absolute or relative path
  const slug = fileName.split('/').pop().replace(/\.md$/, '');

  return {
    slug,
    metadata: data,
    content
  };
}

/**
 * Loads all posts from the `src/posts` directory using Vite's glob import
 */
export function getAllPosts() {
  // Use Vite's eager raw import to load content at build time
  const markdownFiles = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true });
  const posts = [];

  for (const path in markdownFiles) {
    const rawContent = markdownFiles[path];
    const post = parseFrontmatter(path, rawContent);
    posts.push(post);
  }

  // Define a sorting logic (descending by date)
  posts.sort((a, b) => {
    const dateA = new Date(a.metadata.date || '1970-01-01').getTime();
    const dateB = new Date(b.metadata.date || '1970-01-01').getTime();
    return dateB - dateA;
  });

  return posts;
}

/**
 * Gets a single post by its slug
 */
export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug);
}
