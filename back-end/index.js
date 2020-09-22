const express = require('express');
const puppeteer = require('puppeteer');
const { prependHttp } = require('./helpers');

const app = express();
const port = 3000;

const monitor = (_, res) => {
    const sites = [
        {
            name: 'Baleroom',
            url: 'https://baleroom.com',
        },
        {
            name: 'Djanoer Kuning',
            url: 'https://djanoerkuning.com',
        },
        {
            name: 'Test',
            url: 'https://alterweb.id',
        },
    ];

    const captureScreenshot = async (url, siteName) => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.setViewport({ width: 1366, height: 768, })
            await page.goto(url, { waitUntil: 'networkidle2' });

            const pageMetrics = await page.metrics();

            await page.screenshot({ path: `./public/assets/images/${siteName}.png`, });

            const dataItem = {
                url: url,
                response_time: pageMetrics.Timestamp * 1000,
                image: `${siteName}.png`
            };

            await browser.close();

            return dataItem;
        } catch (e) {
            return {
                url: url,
                error: true,
            }
        }
    };

    const captureScreenshots = async () => {
        const data = [];

        for (let i = 0; i < sites.length; i++) {
            const dataItem = await captureScreenshot(sites[i].url, sites[i].name);

            data.push(dataItem);
        }

        return data;
    }

    captureScreenshots().then((data) => res.json(data));
};

const singleMonitor = (req, res) => {
    const url = prependHttp(req.params.url);

    const captureScreenshot = async (url) => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.setViewport({ width: 1366, height: 768, })
            await page.goto(url, { waitUntil: 'networkidle2' });

            const pageMetrics = await page.metrics();
            const pageTitle = await page.title();
            const title = pageTitle.split('|')[0].trim();

            await page.screenshot({ path: `./public/assets/images/${title}.png`, });

            const dataItem = {
                url: url,
                title: title,
                image: `${title}.png`,
                response_time: pageMetrics.TaskDuration,
            };

            await browser.close();

            return dataItem;
        } catch (err) {
            return {
                url: url,
                error: err,
            }
        }
    };

    captureScreenshot(url, '000').then((data) => res.json(data));
};

// Routes
app.get('/test', (_, res) => { res.json('test'); });
app.get('/monitor', monitor);
app.get('/single-monitor/:url', singleMonitor);

app.listen(port, () => {
    console.log('Listening on port ' + port);
});