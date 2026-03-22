#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const BASE_URL = process.env.BLOG_BASE_URL || 'https://lasagna.app';

const BLOG_SRC = path.join(__dirname, '..', 'documentation', 'blog');
const BLOG_OUT = path.join(__dirname, '..', 'public', 'blog');
const POSTS_OUT = path.join(BLOG_OUT, 'posts');
const SITEMAP_OUT = path.join(__dirname, '..', 'public', 'sitemap.xml');
const ROBOTS_OUT = path.join(__dirname, '..', 'public', 'robots.txt');

const STATIC_ROUTES = ['', 'recipes', 'products', 'invoices', 'blog'];

function buildBlog() {
  fs.mkdirSync(BLOG_OUT, { recursive: true });
  fs.mkdirSync(POSTS_OUT, { recursive: true });

  const index = [];

  const langDirs = fs.readdirSync(BLOG_SRC).filter(entry => {
    return fs.statSync(path.join(BLOG_SRC, entry)).isDirectory();
  });

  for (const lang of langDirs) {
    const langDir = path.join(BLOG_SRC, lang);
    const files = fs.readdirSync(langDir).filter(f => f.endsWith('.md'));

    for (const file of files) {
      const raw = fs.readFileSync(path.join(langDir, file), 'utf-8');
      const { data, content } = matter(raw);

      if (!data.slug || !data.title || !data.description || !data.date) {
        console.warn(`⚠️  Пропущен ${file}: отсутствуют обязательные поля (slug, title, description, date)`);
        continue;
      }

      const html = marked.parse(content);

      const date = data.date instanceof Date
        ? data.date.toISOString().split('T')[0]
        : String(data.date);

      const postMeta = {
        slug: data.slug,
        title: data.title,
        description: data.description,
        keywords: data.keywords || '',
        date,
        lang: lang,
        image: data.image || null,
      };

      const postFull = { ...postMeta, html };

      fs.writeFileSync(
        path.join(POSTS_OUT, `${data.slug}.json`),
        JSON.stringify(postFull, null, 2),
        'utf-8'
      );

      index.push(postMeta);
      console.log(`✅ ${lang}/${file} → /blog/${data.slug}`);
    }
  }

  index.sort((a, b) => new Date(b.date) - new Date(a.date));

  fs.writeFileSync(
    path.join(BLOG_OUT, 'index.json'),
    JSON.stringify(index, null, 2),
    'utf-8'
  );

  generateSitemap(index);
  generateRobots();

  console.log(`\n📝 Блог: ${index.length} постов → ${BLOG_OUT}`);
}

function generateSitemap(posts) {
  const staticUrls = STATIC_ROUTES.map(route => `
  <url>
    <loc>${BASE_URL}/${route}</loc>
    <changefreq>weekly</changefreq>
  </url>`).join('');

  const postUrls = posts.map(post => `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${String(post.date).split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
  </url>`).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/0.9">
${staticUrls}
${postUrls}
</urlset>`;

  fs.writeFileSync(SITEMAP_OUT, sitemap.trim(), 'utf-8');
  console.log(`🗺  Sitemap → ${SITEMAP_OUT}`);
}

function generateRobots() {
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`;
  fs.writeFileSync(ROBOTS_OUT, robots, 'utf-8');
  console.log(`🤖 Robots → ${ROBOTS_OUT}`);
}

buildBlog();