import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chromePath = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

console.log('Using browser at:', chromePath);

const outputDir = path.resolve(__dirname, '../public/portfolio-screenshots');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const targets = [
  {
    id: 'shqiponja',
    url: 'https://shqiponja-rho.vercel.app/',
    waitMs: 3500
  },
  {
    id: 'valence',
    url: 'https://valence-khaki.vercel.app/',
    waitMs: 4000
  },
  {
    id: 'omega-architecture',
    url: 'https://mono-store-eta.vercel.app/#reserve',
    waitMs: 3500
  },
  {
    id: 'paperfolio',
    url: 'https://paperfolio-sigma.vercel.app/',
    waitMs: 3500
  },
  {
    id: 'meridian-analytics',
    url: 'https://fin-analytics-three.vercel.app/',
    waitMs: 3500
  },
  {
    id: 'katachi',
    url: 'https://katachi-flax-psi.vercel.app/',
    waitMs: 3500
  },
  {
    id: 'vendome',
    url: 'https://vendome-ashen.vercel.app/',
    waitMs: 4000
  },
  {
    id: 'quolix',
    url: 'https://quolix-woad.vercel.app/',
    waitMs: 3500
  },
  {
    id: 'skooly-edu',
    url: 'https://azure-moose-466393.hostingersite.com/',
    waitMs: 3500
  },
  {
    id: 'pavlos-kolias',
    url: 'https://pavloskolias.com/',
    waitMs: 4000
  },
  {
    id: 'edumanage',
    url: 'https://azure-moose-466393.hostingersite.com/',
    waitMs: 3500,
    scroll: 400
  },
  {
    id: 'quolywheels',
    url: 'https://quolywheels.quolytech.com/',
    waitMs: 4500
  },
  {
    id: 'hypocrates-dental',
    url: 'https://hypocrates-dental-web-demo.netlify.app/',
    waitMs: 3500
  },
  {
    id: 'flowpilot',
    url: 'https://flowpilot-operations.netlify.app/',
    waitMs: 3500
  }
];

async function captureAll() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    defaultViewport: { width: 1440, height: 900 },
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--hide-scrollbars'
    ]
  });

  for (const target of targets) {
    const filename = `${target.id}.png`;
    const outputPath = path.join(outputDir, filename);
    console.log(`\nCapturing [${target.id}] from ${target.url}...`);

    let page;
    try {
      page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
      
      // Navigate
      try {
        await page.goto(target.url, { waitUntil: 'networkidle2', timeout: 35000 });
      } catch (err) {
        console.warn(`  Networkidle timed out for ${target.url}, falling back to domcontentloaded...`);
        try {
          await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
        } catch (e) {
          console.error(`  Failed to load ${target.url}:`, e.message);
        }
      }

      if (target.waitMs) {
        await new Promise((r) => setTimeout(r, target.waitMs));
      }

      if (target.scroll) {
        await page.evaluate((y) => window.scrollBy(0, y), target.scroll);
        await new Promise((r) => setTimeout(r, 1000));
      }

      await page.screenshot({ path: outputPath, type: 'png' });
      console.log(`  ✓ Saved ${filename} (${fs.statSync(outputPath).size} bytes)`);

      // Also capture a secondary detail screenshot for gallery
      const detailFilename = `${target.id}-detail.png`;
      const detailOutputPath = path.join(outputDir, detailFilename);
      await page.evaluate(() => window.scrollBy(0, 650));
      await new Promise((r) => setTimeout(r, 1000));
      await page.screenshot({ path: detailOutputPath, type: 'png' });
      console.log(`  ✓ Saved ${detailFilename} (${fs.statSync(detailOutputPath).size} bytes)`);

    } catch (err) {
      console.error(`  ✕ Error capturing ${target.id}:`, err);
    } finally {
      if (page) {
        try {
          await page.close();
        } catch (_) {}
      }
    }
  }

  await browser.close();
  console.log('\nAll project screenshots captured successfully!');
}

captureAll().catch((err) => {
  console.error('Fatal capture error:', err);
  process.exit(1);
});
