import { MetadataRoute } from 'next';
import { site, absoluteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/_vercel/', '/sw.js', '/sw.js.map', '/workbox-*.js', '/workbox-*.js.map'],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: site.url.replace(/^https?:\/\//, ''),
  };
}
