import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BlogService } from '../blog.service';
import { BlogPostMeta } from '../blog.scheme';
import { USER_LANGUAGE } from '../../settings/service/providers/user-language.token';

@Component({
  selector: 'lg-blog-list',
  template: `
    <div class="lg-blog-list">
      @for (post of posts; track post.slug) {
        <a class="lg-blog-card" [routerLink]="['/blog', post.slug]">
          @if (post.image) {
            <img class="lg-blog-card__image" [src]="post.image" [alt]="post.title" loading="lazy">
          }
          <div class="lg-blog-card__body">
            <time class="lg-blog-card__date">{{ post.date | date:'longDate' }}</time>
            <h2 class="lg-blog-card__title">{{ post.title }}</h2>
            <p class="lg-blog-card__description">{{ post.description }}</p>
          </div>
        </a>
      }
    </div>
  `,
  styles: [`
    .lg-blog-list {
      display: flex;
      flex-direction: column;
      gap: 24px;
      max-width: 720px;
      margin: 0 auto;
      padding: 24px 16px;
    }

    .lg-blog-card {
      display: block;
      text-decoration: none;
      color: inherit;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--mat-sys-outline-variant);
      transition: box-shadow 0.2s;
    }

    .lg-blog-card:hover {
      box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    }

    .lg-blog-card__image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .lg-blog-card__body {
      padding: 16px;
    }

    .lg-blog-card__date {
      font-size: 12px;
      color: var(--mat-sys-on-surface-variant);
    }

    .lg-blog-card__title {
      margin: 8px 0 6px;
      font-size: 18px;
    }

    .lg-blog-card__description {
      margin: 0;
      font-size: 14px;
      color: var(--mat-sys-on-surface-variant);
    }
  `],
  imports: [RouterLink, DatePipe],
})
export class BlogListComponent implements OnInit {
  private _blogService = inject(BlogService);
  private _userLang = inject(USER_LANGUAGE);

  posts: BlogPostMeta[] = [];

  ngOnInit() {
    this._blogService.getIndex().subscribe(all => {
      this.posts = all.filter(p => p.lang === this._userLang());
    });
  }
}