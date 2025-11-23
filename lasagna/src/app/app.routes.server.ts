import {RenderMode, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'home',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'recipes',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'recipes/add',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'recipes/edit/:uuid',
    renderMode: RenderMode.Client
  },
  {
    path: 'recipes/draft/:uuid',
    renderMode: RenderMode.Client
  },
  {
    path: 'recipes/calculate/:uuid',
    renderMode: RenderMode.Client
  },
  {
    path: 'products',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'products/add',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'products/edit/:uuid',
    renderMode: RenderMode.Client
  },
  {
    path: 'products/draft/:uuid',
    renderMode: RenderMode.Client,
  },
  {
    path: 'invoices',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'invoices/edit/:uuid',
    renderMode: RenderMode.Client,
  },
  {
    path: 'settings',
    renderMode: RenderMode.Server,
  },
  {
    path: 'widgets',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'documents',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'dev',
    renderMode: RenderMode.Prerender
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
];
