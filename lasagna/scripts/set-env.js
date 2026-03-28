const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '../src/environments/environment.tpl.ts');
const outputPath = path.join(__dirname, '../src/environments/environment.ts');

// Load .env file (try several paths)
const envPaths = [
  'src/environments/.env',
  '../.env',
  '.env',
];

for (const envPath of envPaths) {
  try {
    const result = require('dotenv').config({ path: envPath });
    if (!result.error) {
      console.log(`Loaded .env from: ${envPath}`);
      break;
    }
  } catch (_) {}
}

// Parse the TS file by stripping the export wrapper and eval-ing the object literal
const source = fs.readFileSync(templatePath, 'utf8');
const objectSource = source
  .replace(/^export const environment\s*=\s*/, '')
  .replace(/;\s*$/, '')
  .trim();

let template;
try {
  template = eval(`(${objectSource})`);
} catch (e) {
  console.error('Failed to parse environment.development.ts:', e.message);
  process.exit(1);
}

// ['api', 'baseUrl'] → 'API_BASE_URL'
function pathToEnvVar(pathArr) {
  return pathArr
    .map(seg => seg.replace(/([A-Z])/g, '_$1').toUpperCase())
    .join('_')
    .replace(/__+/g, '_');
}

// Recursively collect all leaf key paths, skipping 'production' and 'version'
// (version comes from package.json, production is always true in the output)
function collectLeafPaths(obj, prefix = []) {
  const paths = [];
  for (const [key, value] of Object.entries(obj)) {
    if (key === 'production' || key === 'version') continue;
    const current = [...prefix, key];
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      paths.push(...collectLeafPaths(value, current));
    } else {
      paths.push(current);
    }
  }
  return paths;
}

function getNestedValue(obj, pathArr) {
  return pathArr.reduce((cur, key) => cur?.[key], obj);
}

function setNestedValue(obj, pathArr, value) {
  let cur = obj;
  for (let i = 0; i < pathArr.length - 1; i++) {
    if (!(pathArr[i] in cur)) cur[pathArr[i]] = {};
    cur = cur[pathArr[i]];
  }
  cur[pathArr[pathArr.length - 1]] = value;
}

// Build result: env var → template default → ''
const result = { production: true };
const leafPaths = collectLeafPaths(template);

for (const pathArr of leafPaths) {
  const envVar = pathToEnvVar(pathArr);
  const raw = process.env[envVar];
  const envValue = (raw !== undefined && raw !== 'undefined' && raw !== 'null') ? raw : undefined;
  const defaultValue = getNestedValue(template, pathArr);
  const resolvedValue = envValue ?? defaultValue ?? '';

  setNestedValue(result, pathArr, resolvedValue);

  if (envValue !== undefined) {
    console.log(`  ${envVar} = ${envValue}`);
  }
}

// version always from package.json
result.version = require('../package.json').version;

// Serialize result to TypeScript
function serializeValue(value, indent) {
  if (typeof value === 'string') {
    return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
  }
  if (typeof value === 'boolean' || typeof value === 'number') {
    return String(value);
  }
  if (typeof value === 'object' && value !== null) {
    const pad = ' '.repeat(indent);
    const closePad = ' '.repeat(indent - 2);
    const entries = Object.entries(value)
      .map(([k, v]) => `${pad}${k}: ${serializeValue(v, indent + 2)}`)
      .join(',\n');
    return `{\n${entries},\n${closePad}}`;
  }
  return String(value);
}

const topLevel = Object.entries(result)
  .map(([k, v]) => `  ${k}: ${serializeValue(v, 4)}`)
  .join(',\n');

const content = `export const environment = {\n${topLevel},\n};\n`;

fs.writeFileSync(outputPath, content);
console.log(`\nGenerated ${path.relative(process.cwd(), outputPath)}`);
