const request = require('request');
const cheerio = require('cheerio');

request('https://colinstodd.com/posts', (err, resp, html) => {
    if (!err && resp.statusCode === 200) {
        const $ = cheerio.load(html);

        const postTitle = $('h1.uk-article-title');
        console.log(postTitle);
    }
});