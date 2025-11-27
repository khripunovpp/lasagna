const {chromium} = require("playwright");
const fs = require("fs");
const path = require("path");

(async () => {
  const routes = [
    // '/',
    // '/products',
    // '/products/add',
    // '/products/edit/:id',
    '/recipes',
    '/recipes/add',
    '/recipes/edit/:id',
    '/recipes/calculate/:id',
    // '/settings',
    // '/settings?tab=categoires',
    // '/settings?tab=invoice',
    // '/settings?tab=backup',
    // '/settings?tab=logs',
  ];
  const outDir = "e2e/pages";

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, {recursive: true});

  const browser = await chromium.launch();

  for (const route of routes) {
    const url = "http://localhost:4200" + route;
    const attributes = await parsePage(browser, url, filterFn);
    const cleanName = routeToClass(route);
    const className = cleanName + "_Page";
    await writeClassFile(className, attributes, outDir);
  }

  // create an navigations class that exports navigation based on nav.* data-u2e attributes
  const navAttributes = await parsePage(browser, "http://localhost:4200", (name) => name
    && (name.startsWith("nav.") || name.startsWith("global")));
  await writeClassFile("Navigation", navAttributes, outDir);

  await browser.close();
})();

async function parsePage(
  browser,
  url,
  attributeFilterFn,
) {
  const attributes = {};
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: "networkidle"});
  await page.waitForTimeout(500); // wait for any dynamic content
  const items = await page.$$('[data-u2e]');
  for (const h of items) {
    const name = await h.getAttribute("data-u2e");
    if (attributeFilterFn(name)) {
      attributes[name] = true;
    }
  }
  await page.close();
  return attributes;
}

async function writeClassFile(className, attributes, outDir) {
  const po = buildClass(className, attributes);
  const filePath = path.join(outDir, className + ".ts");
  fs.writeFileSync(filePath, po);
  console.log("✔ Generated", filePath);
}

function filterFn(name) {
  return name && !(name.startsWith("nav.") || name.startsWith("global"));
}

/**
 * Convert route "/products/new" → "Products_New"
 */
function routeToClass(route) {
  if (route === "/") return "Home";
  return route
    .replace(/^\//, "")
    .replace(/\//g, "_")
    .replace(/:/g, "Param")
    .replace(/\?/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "")
    .replace(/^./, (x) => x.toUpperCase());
}

/**
 * Convert "product-name" → "productName"
 */
function norm(name) {
  return name
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()) // все разделители
    .replace(/[^a-zA-Z0-9]/g, ''); // убираем оставшиеся лишние символы
}

/**
 * Build TypeScript PageObject class
 */
function buildClass(className, attributes) {
  const fields = Object.keys(attributes)
    .map((a) => {
      const prop = norm(a);
      return `  get ${prop}() { return this.page.locator('[data-u2e="${a}"]'); }`;
    })
    .join("\n\n");

  return `
        import { Page } from '@playwright/test';

export class ${className} {
    constructor(private page: Page) {}

${fields}
}`.trim();
}
