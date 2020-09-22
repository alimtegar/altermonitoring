const puppeteer = require('puppeteer');

async function captureScreenshot(url, siteName) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width: 1366, height: 768, })
    await page.goto(url, { waitUntil: 'networkidle2' });

    const pageMetrics = await page.metrics();
    
    console.log(pageMetrics.Timestamp);

    await page.screenshot({ path: `./public/assets/images/${siteName}.png`, });
    await browser.close();
};

const urls = [
    {
        siteName: 'Baleroom',
        url: 'https://baleroom.com',
    },
    {
        siteName: 'Djanoer Kuning',
        url: 'https://djanoerkuning.com',
    },
];

for (let i = 0; i < urls.length; i++) {
    captureScreenshot(urls[i].url, urls[i].siteName);
}