import { InjectionToken } from '@angular/core';
import { BlogPostFull, BlogPostMeta } from './blog.scheme';

export interface BlogFsReader {
  getPost(slug: string): BlogPostFull | null;
  getIndex(): BlogPostMeta[];
}

export const BLOG_FS_READER = new InjectionToken<BlogFsReader>('BLOG_FS_READER');