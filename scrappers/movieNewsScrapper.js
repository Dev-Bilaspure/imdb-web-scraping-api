const puppeteer = require('puppeteer');
const formatDateToObject = require('../utils/formatDateToObject');

const url = `https://www.imdb.com/news/movie/`;

const movieNewsScrapper = async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    await page.waitFor(1000);
    await page.click("button.ipl-load-more__button");
    await page.waitFor(2000);

    let arr = [];
    for(let i=0;i<=50;i++) {
        // getting title
        let title = '';
        try {
            let titleXPath = `//*[@id="news-article-list"]/article[${i}]/header/h2/a`;
            let [titleElement] = await page.$x(titleXPath);
            
            if(titleElement) {
                const titleTxt = await titleElement.getProperty('textContent');
                title = await titleTxt.jsonValue();
            }
        } catch (error) {
            console.log(error);
        }
        

        // getting author
        let author = '';
        try {
            let authorXPath = `//*[@id="news-article-list"]/article[${i}]/header/ul/li[2]`
            let [authorElement] = await page.$x(authorXPath);
            
            if(authorElement) {
                const authorTxt = await authorElement.getProperty('textContent');
                author = await authorTxt.jsonValue();
            }
        } catch (error) {
            console.log(error);
        }
        

        // getting date
        let date = '';
        try {
            let dateXPath = `//*[@id="news-article-list"]/article[${i}]/header/ul/li[1]`;
            let [dateElement] = await page.$x(dateXPath);
            
            if(dateElement) {
                const dateTxt = await dateElement.getProperty('textContent');
                date = await dateTxt.jsonValue();
                date = formatDateToObject(date);
            }
        } catch (error) {
            console.log(error);
        }
        

        // getting authorPage
        // getting authorPage: url
        let pageUrl = '';
        try {
            let pageUrlXPath = `//*[@id="news-article-list"]/article[${i}]/header/ul/li[3]/a`;
            let [pageUrlElement] = await page.$x(pageUrlXPath);
            
            if(pageUrlElement) {
                const pageUrlTxt = await pageUrlElement.getProperty('href');
                pageUrl = await pageUrlTxt.jsonValue();
            }
        } catch (error) {
            console.log(error);
        }
        
        // getting authorPage: name
        let authorPage = null;
        let pageName = '';
        try {
            let pageNameXPath = `//*[@id="news-article-list"]/article[${i}]/header/ul/li[3]/a`;
            let [pageNameElement] = await page.$x(pageNameXPath);
            
            if(pageNameElement) {
                const pageNameTxt = await pageNameElement.getProperty('textContent');
                pageName = await pageNameTxt.jsonValue();
            }
            authorPage = { pageName, pageUrl };
        } catch (error) {
            console.log(error);
        }
        
        
        // getting description
        let description = '';
        try {
            let descriptionXPath = `//*[@id="news-article-list"]/article[${i}]/section/div/text()[1]`;
            let [descriptionElement] = await page.$x(descriptionXPath);
            
            if(descriptionElement) {
                const descriptionTxt = await descriptionElement.getProperty('textContent');
                description = await descriptionTxt.jsonValue();
            }
        } catch (error) {
            console.log(error);
        }

        // getting image
        let image = '';
        try {
            let imageXPath = `//*[@id="news-article-list"]/article[${i}]/section/img`;
            let [imageElement] = await page.$x(imageXPath);
            
            if(imageElement) {
                const imageTxt = await imageElement.getProperty('src');
                image = await imageTxt.jsonValue();
            }
        } catch (error) {
            console.log(error);
        }
        

        // push object into array
        if(title!=='' && author!=='' && authorPage.pageName!=='' && authorPage.pageUrl!=='' && image!=='') 
            arr.push({date, title, author, authorPage, description, image});
        // else if(title==='' && author==='' && authorPage.pageName==='' && authorPage.pageUrl==='' && image==='') 
        //     break;
    }
    browser.close();
    return(arr);
}

module.exports = movieNewsScrapper;
//*[@id="news-article-list"]/article[19]/header/h2/a
//*[@id="news-article-list"]/article[i]/header/h2/a

//*[@id="news-article-list"]/article[19]/header/ul/li[2]
//*[@id="news-article-list"]/article[i]/header/ul/li[2]

//*[@id="news-article-list"]/article[17]/header/ul/li[1]
//*[@id="news-article-list"]/article[i]/header/ul/li[1]

//*[@id="news-article-list"]/article[19]/header/ul/li[3]/a
//*[@id="news-article-list"]/article[i]/header/ul/li[3]/a
//*[@id="news-article-list"]/article[16]/header/ul/li[3]/a

//*[@id="news-article-list"]/article[17]/section/div
//*[@id="news-article-list"]/article[i]/section/div

//*[@id="news-article-list"]/article[19]/section/img
//*[@id="news-article-list"]/article[i]/section/img

//*[@id="news-article-list"]/article[21]/section/img

//*[@id="news-article-list"]/article[10]/section/div/text()[1]
//*[@id="news-article-list"]/article[i]/section/div/text()[1]