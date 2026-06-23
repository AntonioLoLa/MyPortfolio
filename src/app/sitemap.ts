import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages: { en: siteConfig.url, es: `${siteConfig.url}/es` } },
    },
    {
      url: `${siteConfig.url}/es`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
}
