const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const {
    prependHttp,
    extractDataFromPerformanceTiming,
    extractDataFromPerformanceMetrics,
} = require('./helpers');

const app = express();
const port = 3000;

app.use(cors());

const monitor = (req, res) => {
    const url = prependHttp(req.params.url);

    const getPerformanceTiming = async (url) => {
        const browser = await puppeteer.launch().catch((err) => console.log(err));
        const page = await browser.newPage().catch((err) => console.log(err));

        // Test Page
        const client = await page.target().createCDPSession();

        await client.send('Performance.enable');

        await page.goto(url, { waitUntil: 'networkidle2' });
        await page.setCacheEnabled(false);

        const performanceMetrics = await client.send('Performance.getMetrics');
        const performanceTiming = JSON.parse(
            await page.evaluate(() => JSON.stringify(window.performance.timing)).catch((err) => console.log(err))
        );

        await browser.close().catch((err) => console.log(err));

        const performanceTimingData = extractDataFromPerformanceTiming(
            performanceTiming,
            'responseEnd',
            'domInteractive',
            'domContentLoadedEventEnd',
            'loadEventEnd',
        );
        const performanceMetricsData = extractDataFromPerformanceMetrics(
            performanceMetrics,
            'FirstMeaningfulPaint',
        );

        return {
            ...performanceTimingData,
            ...performanceMetricsData,
        };
    };

    getPerformanceTiming(url).then((data) => res.json(data)).catch((err) => console.log(err));
};

app.get('/monitor/:url', monitor);

app.listen(port, () => {
    console.log('Listening on port ' + port);
});