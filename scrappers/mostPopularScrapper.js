const puppeteer = require('puppeteer');

const url = `https://www.imdb.com/chart/moviemeter/`;

const mostPopularScrapper = async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    let arr = [];
    for(let i=1;i<=100;i++) {
        let rank = '';
        try {
            let rankXPath = `//*[@id="main"]/div/span/div/div/div[3]/table/tbody/tr[${i}]/td[2]/div/text()`;
            let [rankElement] = await page.$x(rankXPath);
            
            if(rankElement) {
                const rankTxt = await rankElement.getProperty('textContent');
                rank = await rankTxt.jsonValue();
                let rankStr = ''; // rank comes is like '71\n'
                for(let k=0;k<=rank.length-2;k++)
                    rankStr+=rank[k];
                rank=rankStr;
            }
        } catch (error) {
            console.log(error);
        }

        let title = '';
        try {
            let titleXPath = `//*[@id="main"]/div/span/div/div/div[3]/table/tbody/tr[${i}]/td[2]/a`;
            let [titleElement] = await page.$x(titleXPath);
            
            if(titleElement) {
                const titleTxt = await titleElement.getProperty('textContent');
                title = await titleTxt.jsonValue();
            }
        } catch (error) {
            console.log(error);
        }

        let year = '';
        try {
            let yearXPath = `//*[@id="main"]/div/span/div/div/div[3]/table/tbody/tr[${i}]/td[2]/span`;
            let [yearElement] = await page.$x(yearXPath);
            
            if(yearElement) {
                const yearTxt = await yearElement.getProperty('textContent');
                year = await yearTxt.jsonValue();
                let yearStr = ''; // years coms like '(2001)'
                for(let k=1;k<year.length-1;k++) 
                    yearStr+=year[k];
                year=yearStr;
            }
        } catch (error) {
            console.log(error);
        }

        let imdbRating = '';
        try {
            let imdbRatingXPath = `//*[@id="main"]/div/span/div/div/div[3]/table/tbody/tr[${i}]/td[3]/strong`;
            let [imdbRatingElement] = await page.$x(imdbRatingXPath);
            
            if(imdbRatingElement) {
                const imdbRatingTxt = await imdbRatingElement.getProperty('textContent');
                imdbRating = await imdbRatingTxt.jsonValue();
            }
        } catch (error) {
            console.log(error);
        }

        arr.push({rank, title, year, imdbRating})
    }
    browser.close();
    return(arr);
}


module.exports = mostPopularScrapper;