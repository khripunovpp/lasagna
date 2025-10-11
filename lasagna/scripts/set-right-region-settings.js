const fs = require('fs');
const path = require('path');
const region = process.env['LG_APP_REGION'] || 'global';
// replace content of index.html with index-ru.html
function replaceIndexHtml() {
  const indexPath = path.join(__dirname, '../src/index.html');
  const regionalIndexPath = path.join(__dirname, `../src/index-${region}.html`);
  if (fs.existsSync(regionalIndexPath)) {
    const regionalContent = fs.readFileSync(regionalIndexPath, 'utf8');
    fs.writeFileSync(indexPath, regionalContent, 'utf8');
    console.log(`Replaced index.html with index-${region}.html`);
  } else {
    console.log(`No regional index file found for region: ${region}. Using default index.html`);
  }
}
replaceIndexHtml();
