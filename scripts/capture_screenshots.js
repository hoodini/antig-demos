
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    const screenshotsDir = path.join(__dirname, '../public/screenshots');
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    // Desktop View
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    // Wait a bit for any animations
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(screenshotsDir, 'desktop-view.png') });
    console.log('Desktop screenshot taken.');

    // Mobile View
    await page.setViewport({ width: 375, height: 667, isMobile: true });
    await page.reload({ waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(screenshotsDir, 'mobile-view.png') });
    console.log('Mobile screenshot taken.');

    await browser.close();
})();
