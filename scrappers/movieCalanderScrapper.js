const puppeteer = require('puppeteer');
const formatDateToObject = require('../utils/formatDateToObject');

let arr = [];

const scrapperMethod = async(url, region) => {
    // const browser = await puppeteer.launch();
    const browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
        ],
      });
    const page = await browser.newPage();
    await page.goto(url);

    for(let i=1;i<=50;i++) {
        // getting date
        let date = '';
        try {
            let dateXPath = `//*[@id="main"]/h4[${i}]`;
            let [dateElement] = await page.$x(dateXPath);
                
            if(dateElement) {
                const dateTxt = await dateElement.getProperty('textContent');
                date = await dateTxt.jsonValue();
            }
            date = formatDateToObject(date);
        } catch (error) {
            console.log(error);
        }

        // getting movies corresponding to this date;
        let movies = [];
        for(let j=1;j<=10;j++) {
            let movie = '';
            try {
                let movieXPath = `//*[@id="main"]/ul[${i}]/li[${j}]/a`;
                let [movieElement] = await page.$x(movieXPath);
                    
                if(movieElement) {
                    const movieTxt = await movieElement.getProperty('textContent');
                    movie = await movieTxt.jsonValue();
                }
                if(movie)
                    movies.push(movie);
                else
                    break;
            } catch (error) {
                console.log(error);
            }
        }
        arr.push({movies,date,region});
    }
    browser.close();
}
const movieCalanderScrapper = async() => {
    let url = `https://www.imdb.com/calendar?region=us`;
    await scrapperMethod(url, 'us');

    url = `https://www.imdb.com/calendar?region=in`;
    await scrapperMethod(url, 'in');

    return(arr);

}

module.exports = movieCalanderScrapper;

