const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');
const url = 'https://colinstodd.com/posts';

// Write Headers:
writeStream.write(`Title,Path,Summary \n`);

request(url, (err, resp, html) => {
    if (!err && resp.statusCode === 200) {
        const $ = cheerio.load(html, {
            withDomLvl1: true,
            normalizeWhitespace: true,
            xmlMode: true,
            decodeEntities: true
        });

        $('.uk-width-expand').each((i, el) => {
            const postTitle = $(el)
                .find('h1.uk-article-title')
                .text()
                .replace(/,/, '');

            const postPath = $(el)
                .find('a.uk-link-reset')
                .attr('href');

            const postSummary = $(el)
                .find('p.article-summary')
                .text()
                .replace(/,/, '');

            // Write row to CSV:
            writeStream.write(`${postTitle},${postPath},${postSummary} \n`);

        });

        console.info('Scrapping complete! File can be found in the root of this project.');
    }
});