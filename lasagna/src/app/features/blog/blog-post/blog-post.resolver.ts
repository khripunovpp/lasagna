import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { BlogService } from '../blog.service';
import { BlogPostFull } from '../blog.scheme';

export const blogPostResolver: ResolveFn<BlogPostFull | null> = (route: ActivatedRouteSnapshot) => {
  const slug = route.paramMap.get('slug') ?? '';
  return inject(BlogService).getPost(slug);
};