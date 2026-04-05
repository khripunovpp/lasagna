const fs = require('fs');
const path = require('path');
const region = process.env['REGION'] || 'global';

const indexPath = path.join(__dirname, '../src/index.html');
const regionalIndexPath = path.join(__dirname, `../src/index-${region}.html`);

if (fs.existsSync(regionalIndexPath)) {
  fs.copyFileSync(regionalIndexPath, indexPath);
  console.log(`Replaced index.html with index-${region}.html`);
} else {
  console.log(`No regional index file found for region: ${region}. Using default index.html`);
}
