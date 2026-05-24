#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {marked} = require('marked');

const ROOT = path.join(__dirname, '..', '..');
const OUT_DIR = path.join(__dirname, '..', 'public');

const POLICIES = ['privacy-policy', 'terms-of-service', 'cookie-policy'];
const LANGS = ['', 'ru'];

function buildPolicies() {
  fs.mkdirSync(OUT_DIR, {recursive: true});

  for (const policy of POLICIES) {
    for (const lang of LANGS) {
      const suffix = lang ? `.${lang}` : '';
      const srcPath = path.join(ROOT, `${policy}${suffix}.md`);
      const outPath = path.join(OUT_DIR, `${policy}${suffix}.html`);

      if (!fs.existsSync(srcPath)) {
        console.warn(`Missing: ${srcPath} — skipping`);
        continue;
      }

      const md = fs.readFileSync(srcPath, 'utf-8');
      fs.writeFileSync(outPath, marked.parse(md));
      console.log(`Built ${path.relative(ROOT, outPath)}`);
    }
  }
}

buildPolicies();
