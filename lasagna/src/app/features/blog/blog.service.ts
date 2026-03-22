import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { BlogPostFull, BlogPostMeta } from './blog.scheme';
import { BLOG_FS_READER } from './blog-fs-reader.token';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private _http = inject(HttpClient);
  private _fsReader = inject(BLOG_FS_READER, { optional: true });

  getIndex() {
    if (this._fsReader) {
      return of(this._fsReader.getIndex());
    }
    return this._http.get<BlogPostMeta[]>('./blog/index.json');
  }

  getPost(slug: string) {
    if (this._fsReader) {
      return of(this._fsReader.getPost(slug));
    }
    return this._http.get<BlogPostFull>(`./blog/posts/${slug}.json`);
  }
}