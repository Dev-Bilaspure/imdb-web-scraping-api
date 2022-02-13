const puppeteer = require('puppeteer');

let moviesWithDetails = [];

const movieDetailScrapper = async(url) => {
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

    let title = '';
    try {
        let titleXPath = `//*[@id="__next"]/main/div/section[1]/section/div[3]/section/section/div[1]/div[1]/h1`;
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
        let yearXPath = `//*[@id="__next"]/main/div/section[1]/section/div[3]/section/section/div[1]/div[1]/div[2]/ul/li[1]/a`;
        let [yearElement] = await page.$x(yearXPath);
        
        if(yearElement) {
            const yearTxt = await yearElement.getProperty('textContent');
            year = await yearTxt.jsonValue();
        }
    } catch (error) {
        console.log(error);
    }

    let imdbRating = '';
    try {
        let imdbRatingXPath = `//*[@id="__next"]/main/div/section[1]/section/div[3]/section/section/div[1]/div[2]/div/div[1]/a/div/div/div[2]/div[1]/span[1]`;
        let [imdbRatingElement] = await page.$x(imdbRatingXPath);
        
        if(imdbRatingElement) {
            const imdbRatingTxt = await imdbRatingElement.getProperty('textContent');
            imdbRating = await imdbRatingTxt.jsonValue();
        }
    } catch (error) {
        console.log(error);
    }

    let director = '';
    try {
        let directorXPath = `//*[@id="__next"]/main/div/section[1]/section/div[3]/section/section/div[3]/div[2]/div[1]/div[3]/ul/li[1]/div/ul/li/a`;
        let [directorElement] = await page.$x(directorXPath);
        
        if(directorElement) {
            const directorTxt = await directorElement.getProperty('textContent');
            director = await directorTxt.jsonValue();
        }
    } catch (error) {
        console.log(error);
    }

    let writers = [];
    for(let k=1;k<=5;k++) {
        let writer = '';
        try {
            let writerXPath = `//*[@id="__next"]/main/div/section[1]/section/div[3]/section/section/div[3]/div[2]/div[1]/div[3]/ul/li[2]/div/ul/li[${k}]/a`;
            let [writerElement] = await page.$x(writerXPath);
            
            if(writerElement) {
                const writerTxt = await writerElement.getProperty('textContent');
                writer = await writerTxt.jsonValue();
                writers.push(writer);
            }
        } catch (error) {
            console.log(error);
        }
    }

    let tags = [];
    for(let k=1;k<=5;k++) {
        let tag = '';
        try {
            let tagXPath = `//*[@id="__next"]/main/div/section[1]/section/div[3]/section/section/div[3]/div[2]/div[1]/div[1]/div/a[${k}]/span`;
            let [tagElement] = await page.$x(tagXPath);
            
            if(tagElement) {
                const tagTxt = await tagElement.getProperty('textContent');
                tag = await tagTxt.jsonValue();
                tags.push(tag);
            }
        } catch (error) {
            console.log(error);
        }
    }

    let plot = '';
    try {
        let plotXPath = `//*[@id="__next"]/main/div/section[1]/section/div[3]/section/section/div[3]/div[2]/div[1]/div[1]/p/span[3]`;
        let [plotElement] = await page.$x(plotXPath);
        
        if(plotElement) {
            const plotTxt = await plotElement.getProperty('textContent');
            plot = await plotTxt.jsonValue();
        }
    } catch (error) {
        console.log(error);
    }


    let cast = [];
    let sec = 3;
    for(let k=1;k<=10;k++) {
        let actor = '';
        try {
            let actorXPath = `//*[@id="__next"]/main/div/section[1]/div/section/div/div[1]/section[${sec}]/div[2]/div[2]/div[${k}]/div[2]/a`;
            let [actorElement] = await page.$x(actorXPath);
            
            if(actorElement) {
                const actorTxt = await actorElement.getProperty('textContent');
                actor = await actorTxt.jsonValue();
                cast.push(actor);
            }
            else {
                sec = 4;
                // { // again computing for k=1
                let actorXPath = `//*[@id="__next"]/main/div/section[1]/div/section/div/div[1]/section[${sec}]/div[2]/div[2]/div[1]/div[2]/a`;
                let [actorElement] = await page.$x(actorXPath);
                
                if(actorElement) {
                    const actorTxt = await actorElement.getProperty('textContent');
                    actor = await actorTxt.jsonValue();
                    cast.push(actor);
                }
                // }
            }
                
        } catch (error) {
            console.log(error);
        }
    }
    moviesWithDetails.push({ title, year, imdbRating, director, writers, tags, plot, cast })
    browser.close();
}







const seatchMovieScrapper = async(query) => {
    moviesWithDetails = []; // clear the array
    let url = `https://www.imdb.com/find?q=${query}`
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    

    //*[@id="main"]/div/div[3]/h3
    //*[@id="main"]/div/div[2]/h3
    let div1Text = '';
    try {
        let div1TextXPath = `//*[@id="main"]/div/div[2]/h3`;
        let [div1TextElement] = await page.$x(div1TextXPath);
            
        if(div1TextElement) {
            const div1TextTxt = await div1TextElement.getProperty('textContent');
            div1Text = await div1TextTxt.jsonValue();
        }
    } catch (error) {
        console.log(error);
    }

    let div2Text = '';
    try {
        let div2TextXPath = `//*[@id="main"]/div/div[3]/h3`;
        let [div2TextElement] = await page.$x(div2TextXPath);
            
        if(div2TextElement) {
            const div2TextTxt = await div2TextElement.getProperty('textContent');
            div2Text = await div2TextTxt.jsonValue();
        }
    } catch (error) {
        console.log(error);
    }

    let divValue = 2;
    if(div1Text==='Titles')
        divValue = 2;
    else if(div2Text==='Titles')
        divValue = 3;

    let detailUrls = [];
    for(let i=1;i<=3;i++) {
        let detailUrl = '';
        try {
            //*[@id="main"]/div/div[3]/table/tbody/tr[1]/td[2]/a
            let detailUrlXPath = `//*[@id="main"]/div/div[${divValue}]/table/tbody/tr[${i}]/td[2]/a`;
            let [detailUrlElement] = await page.$x(detailUrlXPath);
            
            if(detailUrlElement) {
                const detailUrlTxt = await detailUrlElement.getProperty('href');
                detailUrl = await detailUrlTxt.jsonValue();
                detailUrls.push(detailUrl);
            }
        } catch (error) {
            console.log(error);
        }
    }
    browser.close();
    console.log(detailUrls);
    for(let k=0;k<detailUrls.length;k++)
            await movieDetailScrapper(detailUrls[k]);
    return(moviesWithDetails);
}
module.exports = seatchMovieScrapper;


//*[@id="__next"]/main/div/section[1]/section/div[3]/section/section/div[1]/div[2]/div/div[1]/a/div/div/div[2]/div[1]/span[1]
//*[@id="__next"]/main/div/section[1]/section/div[3]/section/section/div[1]/div[2]/div/div[1]/a/div/div/div[2]/div[1]/span[1]
//*[@id="__next"]/main/div/section[1]/section/div[3]/section/section/div[1]/div[2]/div/div[1]/a/div/div/div[2]/div[1]/span[1]