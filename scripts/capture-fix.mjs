import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = path.resolve(__dirname, '../public/portfolio-screenshots');

async function fixScreenshots() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    defaultViewport: { width: 1440, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--hide-scrollbars']
  });

  // 1. QuolyWheels - Wait for preloader to fade away (approx 6-7s)
  try {
    console.log('Capturing QuolyWheels with preloader wait...');
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('https://quolywheels.quolytech.com/', { waitUntil: 'networkidle2', timeout: 35000 });
    // Wait for preloader to be hidden or wait 8 seconds
    await new Promise(r => setTimeout(r, 8000));
    // Also remove any remaining preloader elements if any
    await page.evaluate(() => {
      const loader = document.querySelector('#preloader, .preloader, #loading, .loading-screen');
      if (loader) loader.style.display = 'none';
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(outputDir, 'quolywheels.png') });
    console.log('✓ QuolyWheels hero captured without preloader');

    // QuolyWheels detail
    await page.evaluate(() => window.scrollBy(0, 600));
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(outputDir, 'quolywheels-detail.png') });
    console.log('✓ QuolyWheels detail captured');
    await page.close();
  } catch (e) {
    console.error('QuolyWheels fix error:', e);
  }

  // 2. Pavlos Kolias - Ensure hero finishes typing/fading
  try {
    console.log('Capturing Pavlos Kolias...');
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('https://pavloskolias.com/', { waitUntil: 'networkidle2', timeout: 35000 });
    await new Promise(r => setTimeout(r, 5000));
    await page.screenshot({ path: path.join(outputDir, 'pavlos-kolias.png') });
    console.log('✓ Pavlos Kolias hero captured');
    await page.close();
  } catch (e) {
    console.error('Pavlos Kolias error:', e);
  }

  // 3. EduManage - Log into Skooly/EduManage demo to capture the actual enterprise dashboard!
  try {
    console.log('Capturing EduManage dashboard...');
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('https://azure-moose-466393.hostingersite.com/', { waitUntil: 'networkidle2', timeout: 35000 });
    await new Promise(r => setTimeout(r, 2000));
    
    // Look for Super Admin "Try Demo" button or select role
    const buttons = await page.$$('button, a');
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.innerText, btn);
      if (text && text.includes('Try Demo')) {
        await btn.click();
        break;
      }
    }
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({ path: path.join(outputDir, 'edumanage.png') });
    console.log('✓ EduManage dashboard captured');

    await page.evaluate(() => window.scrollBy(0, 500));
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(outputDir, 'edumanage-detail.png') });
    console.log('✓ EduManage detail captured');
    await page.close();
  } catch (e) {
    console.error('EduManage error:', e);
  }

  await browser.close();
}

fixScreenshots();
