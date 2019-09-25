// https://github.com/cheeriojs/cheerio
// https://github.com/request/request
const request = require('request');
const cheerio = require('cheerio');
const url = 'https://colinstodd.com/posts';

request(url, (err, resp, html) => {
    if (!err && resp.statusCode === 200) {
        const $ = cheerio.load(html);

        const postTitle = $('h1.uk-article-title');

        // console.log(postTitle.html());
        // console.log(postTitle.text());

        // const output = postTitle.find('a').text();
        // const output = postTitle.children('h1').text();
        // const output = postTitle.children('h1').next().html();
        // const output = postTitle.children('h1').parent().html();

        // Iterating over a list via jQuery syntax.
        $('.nav-item a').each((index, element) => {
            const item = $(element).text();
            const link = $(element).attr('href');

            // console.log(index);

            console.log(link);
        });


    }
});