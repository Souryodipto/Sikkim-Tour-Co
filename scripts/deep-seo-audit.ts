/**
 * Automated Deep Technical SEO Crawler & Audit Engine
 * Evaluates all 15 technical SEO checklist points across all generated HTML files in dist/
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

export interface AuditIssue {
  category: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  url: string;
  issue: string;
  details?: string;
}

const issues: AuditIssue[] = [];

// Recursive file scanner for HTML files in dist/
function getAllHtmlFiles(dir: string, baseDir = dir): { filePath: string; routePath: string }[] {
  const results: { filePath: string; routePath: string }[] = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllHtmlFiles(fullPath, baseDir));
    } else if (entry.name.endsWith('.html')) {
      const relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      let routePath = '/' + relPath.replace(/\/index\.html$/, '').replace(/\.html$/, '');
      if (routePath === '/index' || routePath === '') routePath = '/';
      results.push({ filePath: fullPath, routePath });
    }
  }
  return results;
}

console.log('=== STARTING AUTOMATED DEEP TECHNICAL SEO AUDIT ===\n');

// 1. Check dist directory existence
if (!fs.existsSync(distDir)) {
  console.error('dist directory does not exist. Please run npm run build first.');
  process.exit(1);
}

const htmlFiles = getAllHtmlFiles(distDir);
console.log(`Discovered ${htmlFiles.length} HTML files across dist/ to crawl.\n`);

const seenTitles = new Map<string, string[]>();
const seenDescriptions = new Map<string, string[]>();
const allDiscoveredRoutes = new Set(htmlFiles.map((f) => f.routePath));

// 14. Check 404 page in dist/
const has404Html = fs.existsSync(path.join(distDir, '404.html'));
if (!has404Html) {
  issues.push({
    category: '404 and Soft 404 Pages',
    severity: 'HIGH',
    url: '/404',
    issue: 'Missing dedicated dist/404.html for hard 404 responses',
    details: 'Vercel fallback without dist/404.html can return 200 OK with root index.html for dead URLs, leading to Soft 404 indexing errors by Googlebot.',
  });
}

// 9. Check Robots.txt and Sitemap.xml
const robotsPath = path.join(distDir, 'robots.txt');
const sitemapPath = path.join(distDir, 'sitemap.xml');

let sitemapUrls: string[] = [];
if (!fs.existsSync(robotsPath)) {
  issues.push({
    category: 'Robots.txt and XML Sitemap',
    severity: 'CRITICAL',
    url: '/robots.txt',
    issue: 'Missing robots.txt in dist directory',
  });
} else {
  const robotsTxt = fs.readFileSync(robotsPath, 'utf8');
  if (!robotsTxt.includes('Sitemap:')) {
    issues.push({
      category: 'Robots.txt and XML Sitemap',
      severity: 'HIGH',
      url: '/robots.txt',
      issue: 'Robots.txt does not specify Sitemap directive',
    });
  }
  if (robotsTxt.includes('Disallow: /')) {
    // Check if whole site is blocked
    const lines = robotsTxt.split('\n').map(l => l.trim());
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('User-agent: *') && lines[i+1] === 'Disallow: /') {
        issues.push({
          category: 'Accidental Noindex Directives',
          severity: 'CRITICAL',
          url: '/robots.txt',
          issue: 'Robots.txt contains site-wide Disallow: / for all crawlers',
        });
      }
    }
  }
}

if (!fs.existsSync(sitemapPath)) {
  issues.push({
    category: 'Robots.txt and XML Sitemap',
    severity: 'CRITICAL',
    url: '/sitemap.xml',
    issue: 'Missing sitemap.xml in dist directory',
  });
} else {
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
  const locMatches = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)];
  sitemapUrls = locMatches.map(m => m[1]);
  console.log(`Parsed ${sitemapUrls.length} URLs from sitemap.xml.`);

  // Verify sitemap URLs match prerendered pages
  for (const sUrl of sitemapUrls) {
    try {
      const parsed = new URL(sUrl);
      let rPath = parsed.pathname;
      if (rPath.length > 1 && rPath.endsWith('/')) rPath = rPath.slice(0, -1);
      
      if (!allDiscoveredRoutes.has(rPath) && !allDiscoveredRoutes.has(rPath + '/')) {
        issues.push({
          category: 'Robots.txt and XML Sitemap',
          severity: 'HIGH',
          url: sUrl,
          issue: `Sitemap references URL that has no prerendered HTML file in dist: ${rPath}`,
        });
      }
    } catch (e) {
      issues.push({
        category: 'Robots.txt and XML Sitemap',
        severity: 'MEDIUM',
        url: sUrl,
        issue: `Malformed URL in sitemap.xml: ${sUrl}`,
      });
    }
  }
}

// Inspect every HTML file
for (const file of htmlFiles) {
  const { filePath, routePath } = file;
  const content = fs.readFileSync(filePath, 'utf8');

  // 15. Check Accidental Noindex Directives
  const robotsMetaMatch = content.match(/<meta[^>]*name=["']robots["'][^>]*content=["'](.*?)["']/i);
  if (robotsMetaMatch) {
    const robotsVal = robotsMetaMatch[1].toLowerCase();
    if (robotsVal.includes('noindex') || robotsVal.includes('none')) {
      if (routePath !== '/404' && routePath !== '/404.html') {
        issues.push({
          category: 'Accidental Noindex Directives',
          severity: 'CRITICAL',
          url: routePath,
          issue: `Page contains noindex directive: "${robotsVal}"`,
        });
      }
    }
  }

  // 11. Mobile Responsiveness / Viewport
  const viewportMatch = content.match(/<meta[^>]*name=["']viewport["'][^>]*content=["'](.*?)["']/i);
  if (!viewportMatch) {
    issues.push({
      category: 'Mobile Responsiveness',
      severity: 'CRITICAL',
      url: routePath,
      issue: 'Missing <meta name="viewport"> tag',
    });
  } else if (!viewportMatch[1].includes('width=device-width')) {
    issues.push({
      category: 'Mobile Responsiveness',
      severity: 'HIGH',
      url: routePath,
      issue: 'Viewport does not specify width=device-width',
    });
  }

  // 3. Unique Page Titles & Descriptions
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  if (!title) {
    issues.push({
      category: 'Unique Page Titles and Descriptions',
      severity: 'CRITICAL',
      url: routePath,
      issue: 'Missing or empty <title> tag',
    });
  } else {
    if (title.length < 25) {
      issues.push({
        category: 'Unique Page Titles and Descriptions',
        severity: 'LOW',
        url: routePath,
        issue: `Page title is short (${title.length} chars): "${title}"`,
      });
    } else if (title.length > 70) {
      issues.push({
        category: 'Unique Page Titles and Descriptions',
        severity: 'LOW',
        url: routePath,
        issue: `Page title may truncate in SERP (${title.length} chars): "${title}"`,
      });
    }
    const routesWithTitle = seenTitles.get(title) || [];
    routesWithTitle.push(routePath);
    seenTitles.set(title, routesWithTitle);
  }

  const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/i);
  const description = descMatch ? descMatch[1].trim() : '';
  if (!description) {
    issues.push({
      category: 'Unique Page Titles and Descriptions',
      severity: 'HIGH',
      url: routePath,
      issue: 'Missing or empty <meta name="description"> tag',
    });
  } else {
    if (description.length < 50) {
      issues.push({
        category: 'Unique Page Titles and Descriptions',
        severity: 'MEDIUM',
        url: routePath,
        issue: `Meta description is short (${description.length} chars)`,
      });
    }
    const routesWithDesc = seenDescriptions.get(description) || [];
    routesWithDesc.push(routePath);
    seenDescriptions.set(description, routesWithDesc);
  }

  // 4. Canonical URLs
  const canonicalMatch = content.match(/<link[^>]*rel=["']canonical["'][^>]*href=["'](.*?)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';
  if (!canonical) {
    issues.push({
      category: 'Canonical URLs',
      severity: 'HIGH',
      url: routePath,
      issue: 'Missing canonical URL link tag',
    });
  } else {
    if (!canonical.startsWith('http://') && !canonical.startsWith('https://')) {
      issues.push({
        category: 'Canonical URLs',
        severity: 'HIGH',
        url: routePath,
        issue: `Relative canonical URL detected: ${canonical}`,
      });
    }
    // Verify canonical path aligns with routePath
    try {
      const cUrl = new URL(canonical);
      let cPath = cUrl.pathname;
      if (cPath.length > 1 && cPath.endsWith('/')) cPath = cPath.slice(0, -1);
      if (routePath !== '/404' && routePath !== '/404.html') {
        if (cPath !== routePath && routePath !== '/index') {
          issues.push({
            category: 'Canonical URLs',
            severity: 'HIGH',
            url: routePath,
            issue: `Canonical URL path mismatch: expected "${routePath}", found "${cPath}" (${canonical})`,
          });
        }
      }
    } catch {
      issues.push({
        category: 'Canonical URLs',
        severity: 'HIGH',
        url: routePath,
        issue: `Invalid canonical URL format: ${canonical}`,
      });
    }
  }

  // 2. Server-rendered or Prerendered HTML verification
  const rootMatch = content.match(/<div id=["']root["']>([\s\S]*?)<\/div>/i);
  const rootInner = rootMatch ? rootMatch[1].trim() : '';
  if (!rootInner || rootInner.length < 50) {
    issues.push({
      category: 'Server-rendered or Prerendered HTML',
      severity: 'HIGH',
      url: routePath,
      issue: 'Root element is empty or has minimal prerendered content (client-side only)',
    });
  }

  // 5. H1 and Heading Hierarchy
  const h1Matches = [...content.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1Matches.length === 0) {
    issues.push({
      category: 'H1 and Heading Hierarchy',
      severity: 'HIGH',
      url: routePath,
      issue: 'Page is missing an <h1> tag',
    });
  } else if (h1Matches.length > 1) {
    // Only warn if multiple distinct h1 tags exist
    const h1Texts = h1Matches.map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
    if (new Set(h1Texts).size > 1) {
      issues.push({
        category: 'H1 and Heading Hierarchy',
        severity: 'MEDIUM',
        url: routePath,
        issue: `Page has multiple distinct <h1> tags (${h1Matches.length}): "${h1Texts.join(' | ')}"`,
      });
    }
  }

  // 8. Missing Image ALT Attributes
  const imgMatches = [...content.matchAll(/<img([^>]*?)>/gi)];
  for (const img of imgMatches) {
    const attrs = img[1];
    const srcMatch = attrs.match(/src=["'](.*?)["']/i);
    const src = srcMatch ? srcMatch[1] : 'unknown';
    const altMatch = attrs.match(/alt=["'](.*?)["']/i);
    if (!altMatch) {
      issues.push({
        category: 'Missing Image ALT Attributes',
        severity: 'MEDIUM',
        url: routePath,
        issue: `Image tag missing alt attribute entirely: ${src}`,
      });
    } else if (altMatch[1].trim() === '' && !attrs.includes('role="presentation"') && !attrs.includes('aria-hidden="true"')) {
      issues.push({
        category: 'Missing Image ALT Attributes',
        severity: 'LOW',
        url: routePath,
        issue: `Image has empty alt attribute without presentation role: ${src}`,
      });
    }
  }

  // 7. Broken Internal Links
  const anchorMatches = [...content.matchAll(/<a[^>]*href=["'](.*?)["'][^>]*>/gi)];
  for (const a of anchorMatches) {
    const href = a[1].trim();
    if (href.startsWith('/') && !href.startsWith('//')) {
      // Internal link
      const [cleanHref] = href.split('#')[0].split('?');
      if (cleanHref && cleanHref !== '') {
        let normHref = cleanHref;
        if (normHref.length > 1 && normHref.endsWith('/')) normHref = normHref.slice(0, -1);
        if (!allDiscoveredRoutes.has(normHref) && !allDiscoveredRoutes.has(normHref + '/')) {
          // Check if it's an asset or dynamic path
          if (!normHref.startsWith('/assets/') && !normHref.startsWith('/api/')) {
            issues.push({
              category: 'Broken Internal and External Links',
              severity: 'HIGH',
              url: routePath,
              issue: `Broken internal link to: "${href}"`,
            });
          }
        }
      }
    }
  }

  // 10. Structured Data (JSON-LD) Validity
  const jsonLdMatches = [...content.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const match of jsonLdMatches) {
    const rawJson = match[1].trim();
    try {
      const parsed = JSON.parse(rawJson);
      if (!parsed['@context']) {
        issues.push({
          category: 'Structured Data Validity',
          severity: 'MEDIUM',
          url: routePath,
          issue: 'JSON-LD block is missing "@context": "https://schema.org"',
        });
      }
    } catch (e: any) {
      issues.push({
        category: 'Structured Data Validity',
        severity: 'CRITICAL',
        url: routePath,
        issue: `Malformed JSON-LD syntax: ${e.message}`,
      });
    }
  }

  // 12. Core Web Vitals checks
  if (content.includes('<link rel="preconnect" href="https://fonts.googleapis.com">') && !content.includes('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin')) {
    issues.push({
      category: 'Core Web Vitals',
      severity: 'LOW',
      url: routePath,
      issue: 'Google Fonts preconnect to gstatic is missing crossorigin attribute',
    });
  }
}

// 3. Duplicate Titles Check
for (const [title, rList] of seenTitles.entries()) {
  if (rList.length > 1) {
    // Filter out alias pages (e.g. /about-us and /sikkim-tour-company) if intentional
    issues.push({
      category: 'Duplicate Content and Titles',
      severity: 'MEDIUM',
      url: rList.join(', '),
      issue: `Duplicate <title> across multiple URLs: "${title}"`,
    });
  }
}

// 6. Duplicate Meta Descriptions Check
for (const [desc, rList] of seenDescriptions.entries()) {
  if (rList.length > 1) {
    issues.push({
      category: 'Duplicate Content and Titles',
      severity: 'LOW',
      url: rList.join(', '),
      issue: `Duplicate <meta description> across multiple URLs (${rList.length} pages)`,
      details: `URLs: ${rList.slice(0, 4).join(', ')}${rList.length > 4 ? ' ...' : ''}`,
    });
  }
}

// Print Audit Results Summary
console.log('=== TECHNICAL SEO AUDIT RESULTS ===\n');
console.log(`Total Issues Identified: ${issues.length}\n`);

const critical = issues.filter(i => i.severity === 'CRITICAL');
const high = issues.filter(i => i.severity === 'HIGH');
const medium = issues.filter(i => i.severity === 'MEDIUM');
const low = issues.filter(i => i.severity === 'LOW');

console.log(`Critical: ${critical.length}`);
console.log(`High: ${high.length}`);
console.log(`Medium: ${medium.length}`);
console.log(`Low: ${low.length}\n`);

for (const issue of issues) {
  console.log(`[${issue.severity}] [${issue.category}]`);
  console.log(`URL: ${issue.url}`);
  console.log(`Issue: ${issue.issue}`);
  if (issue.details) console.log(`Details: ${issue.details}`);
  console.log('---');
}

fs.writeFileSync(
  path.join(__dirname, '../audit-results.json'),
  JSON.stringify(issues, null, 2),
  'utf8'
);
console.log(`Audit saved to audit-results.json`);
