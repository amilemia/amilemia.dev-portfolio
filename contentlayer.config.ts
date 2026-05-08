import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { locales, fallbackLocale } from './src/i18n/locales';

export const LeadMagnet = defineDocumentType(() => ({
  name: 'LeadMagnet',
  filePathPattern: `lead-magnets/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    description: { type: 'string', required: true },
    thumbnail: { type: 'string', required: true },
    fileUrl: { type: 'string', required: true },
    downloadCount: { type: 'number', required: false, default: 0 },
    rating: { type: 'number', required: false },
    category: { 
      type: 'enum', 
      options: ['checklist', 'guide', 'template', 'toolkit'], 
      required: true 
    },
    relatedTo: { 
      type: 'list', 
      of: { type: 'string' }, 
      required: false 
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (leadMagnet) => `/resources/${leadMagnet.slug}`,
    },
  },
}));

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    cover: { type: 'string', required: false },
    tags: { type: 'list', of: { type: 'string' }, required: false },
    role: { type: 'string', required: false },
    stack: { type: 'list', of: { type: 'string' }, required: false },
    locale: {
      type: 'enum',
      required: false,
      options: locales,
      defaultValue: fallbackLocale,
    },
    dates: {
      type: 'json',
      required: true,
      fields: {
        start: { type: 'date', required: true },
        end: { type: 'date', required: false },
      }
    },
    links: {
      type: 'json',
      required: false,
      fields: {
        repo: { type: 'string', required: false },
        live: { type: 'string', required: false },
      }
    },
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
    testimonial: {
      type: 'json',
      required: false,
      fields: {
        quote: { type: 'string', required: true },
        author: { type: 'string', required: true },
        role: { type: 'string', required: false },
      }
    },
    caseStudy: {
      type: 'json',
      required: false,
      fields: {
        problem: { type: 'string', required: true },
        solution: { type: 'string', required: true },
        implementation: { type: 'string', required: true },
        results: { type: 'list', of: { type: 'string' }, required: true },
      }
    },
    beforeAfter: {
      type: 'list',
      required: false,
      of: {
        type: 'json',
        fields: {
          type: { type: 'enum', options: ['screenshot', 'metric', 'video'], required: true },
          before: { type: 'string', required: true },
          after: { type: 'string', required: true },
          caption: { type: 'string', required: false },
        }
      }
    },
    technicalDeepDive: {
      type: 'json',
      required: false,
      fields: {
        architecture: { type: 'string', required: false },
        challenges: { type: 'list', of: { type: 'string' }, required: false },
        decisions: { type: 'list', of: { type: 'string' }, required: false },
      }
    },
    relatedProjects: {
      type: 'list',
      of: { type: 'string' }, // slugs of related projects
      required: false,
    },
    videoTestimonial: {
      type: 'json',
      required: false,
      fields: {
        url: { type: 'string', required: true },
        thumbnail: { type: 'string', required: false },
        duration: { type: 'number', required: false },
      }
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (project) => {
        const locale = project.locale ?? fallbackLocale;
        const basePath = `/projects/${project.slug}`;
        return locale === fallbackLocale ? basePath : `/${locale}${basePath}`;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [LeadMagnet, Project],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
});
