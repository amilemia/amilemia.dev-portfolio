import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    // Basic info
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    cover: { type: 'string', required: false },
    
    // Categorization
    tags: { type: 'list', of: { type: 'string' }, required: false },
    role: { type: 'string', required: false },
    stack: { type: 'list', of: { type: 'string' }, required: false },
    
    // Dates (handled as strings to avoid Windows path issues)
    dates: { 
      type: 'json', 
      required: true,
      fields: {
        start: { type: 'date', required: true },
        end: { type: 'date', required: false },
      }
    },
    
    // Links (handled as JSON to avoid Windows path issues)
    links: { 
      type: 'json',
      required: false,
      fields: {
        repo: { type: 'string', required: false },
        live: { type: 'string', required: false },
      }
    },
    
    // Metrics (handled as JSON to avoid Windows path issues)
    metrics: { 
      type: 'list', 
      required: false,
      of: {
        type: 'json',
        fields: {
          label: { type: 'string', required: true },
          value: { type: 'string', required: true },
        }
      } 
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (project) => `/projects/${project.slug}`,
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Project],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
});
