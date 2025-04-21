// 📁 docs-generator/index.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const {marked} = require('marked');

const inputDir = '/markdowns';
const outputDir = './public/docs';
const treeOutput = path.join(outputDir, 'tree.json');
const dataOutput = path.join(outputDir, 'data.json');
const metaOutput = path.join(outputDir, 'meta.json');

const tree = [];
const docs = [];

function walk(dir, base = '', treeRef) {
  const entries = fs.readdirSync(dir);

  entries.forEach(entry => {
    const fullPath = path.join(dir, entry);
    const relPath = path.join(base, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const folderNode = {type: 'folder', name: entry, children: []};
      treeRef.push(folderNode);
      walk(fullPath, relPath, folderNode.children);
    } else if (entry.endsWith('.md')) {
      const raw = fs.readFileSync(fullPath, 'utf-8');
      const {data, content} = matter(raw);
      const html = marked(content);

      const fileNode = {
        type: 'file',
        name: entry,
        path: relPath.replace(/\\/g, '/'),
        title: data.title || entry.replace('.md', ''),
        data
      };

      docs.push({
        ...fileNode,
        html
      });

      treeRef.push(fileNode);
    }
  });
}

fs.mkdirSync(outputDir, {recursive: true});
walk(__dirname + inputDir, '', tree);

fs.writeFileSync(treeOutput, JSON.stringify(tree, null, 2));
fs.writeFileSync(dataOutput, JSON.stringify(docs, null, 2));
fs.writeFileSync(metaOutput, JSON.stringify({ updatedAt: Date.now() }, null, 2));

console.log('📘 Документация сгенерирована');
