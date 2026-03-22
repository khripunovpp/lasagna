import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { BlogPostFull } from '../blog.scheme';

@Component({
  selector: 'lg-blog-post',
  template: `
    <article class="lg-blog-post">
      <div [innerHTML]="html"></div>
    </article>
  `,
  styles: [`
    .lg-blog-post {
      max-width: 720px;
      margin: 0 auto;
      padding: 24px 16px;
    }
  `],
})
export class BlogPostComponent implements OnInit {
  private _route = inject(ActivatedRoute);
  private _meta = inject(Meta);
  private _title = inject(Title);

  html = '';

  ngOnInit() {
    const post: BlogPostFull | null = this._route.snapshot.data['post'];
    if (!post) return;

    this._title.setTitle(post.title);
    this._meta.updateTag({ name: 'description', content: post.description });
    this._meta.updateTag({ name: 'keywords', content: post.keywords });
    this._meta.updateTag({ property: 'og:title', content: post.title });
    this._meta.updateTag({ property: 'og:description', content: post.description });

    if (post.image) {
      this._meta.updateTag({ property: 'og:image', content: post.image });
    }

    this.html = post.html;
  }
}