
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

function parseLanguageFromName(name) {
  const match = name.match(/\[([a-z]{2})\]/);
  return match ? match[1] : 'en';
}

function transformAccordionBlocks(markdown) {
  return markdown.replace(
    /:::accordion\s+([^\n]+)\n([\s\S]*?)\n:::/g,
    (_, question, answer) => {
      return `<details class="lg-accordion"><summary>${question}</summary><div>${marked.parse(answer.trim())}</div></details>`;
    }
  );
}

function walkAndParse(dir, base = '', treeRef = [], docs = []) {
  const entries = fs.readdirSync(dir);

  entries.forEach(entry => {
    const fullPath = path.join(dir, entry);
    const relPath = path.join(base, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const folderNode = { type: 'folder', name: entry, children: [] };
      treeRef.push(folderNode);
      walkAndParse(fullPath, relPath, folderNode.children, docs);
    } else if (entry.endsWith('.md')) {
      const raw = fs.readFileSync(fullPath, 'utf-8');
      const { data, content } = matter(raw);
      const transformed = transformAccordionBlocks(content);
      const html = marked.parse(transformed);

      const fileNode = {
        type: 'file',
        name: entry,
        language: parseLanguageFromName(entry),
        path: relPath.replace(/\\/g, '/'),
        title: data.title || entry.replace('.md', ''),
        order: data.order || 0,
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

function generateDocumentation({ inputDir, outputDir }) {
  const fullInputDir = path.join(__dirname, inputDir);
  const fullOutputDir = path.join(__dirname, '..', outputDir);

  const tree = [];
  const docs = [];

  fs.mkdirSync(fullOutputDir, { recursive: true });

  walkAndParse(fullInputDir, '', tree, docs);

  fs.writeFileSync(path.join(fullOutputDir, 'tree.json'), JSON.stringify(tree, null, 2));
  fs.writeFileSync(path.join(fullOutputDir, 'data.json'), JSON.stringify(docs, null, 2));
  fs.writeFileSync(path.join(fullOutputDir, 'meta.json'), JSON.stringify({ updatedAt: Date.now() }, null, 2));

  console.log(`✅ Сгенерировано: ${outputDir}`);
}

generateDocumentation({
  inputDir: '/markdowns',
  outputDir: './public/docs'
});

generateDocumentation({
  inputDir: '/faq',
  outputDir: './public/faq'
});
