#!/usr/bin/ver node

const fs = require('fs');
const path = require('path');

function generateVersion() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}.${month}.${day}.${hours}${minutes}`;
}

function writeEnvJson(targetDir, version) {
  const verPath = path.join(targetDir, 'ver.json');
  const data = JSON.stringify({ version }, null, 2);
  fs.writeFileSync(verPath, data, 'utf8');
  return verPath;
}

function main() {
  const projectRoot = path.join(__dirname, '..');
  const publicDir = path.join(projectRoot, 'public');
  if (!fs.existsSync(publicDir)) {
    console.error('Public directory not found:', publicDir);
    process.exit(1);
  }
  const version = generateVersion();
  const output = writeEnvJson(publicDir, version);
  console.log(`ver.json written at ${output} with version ${version}`);
}

if (require.main === module) {
  main();
}

module.exports = { generateVersion, writeEnvJson };


