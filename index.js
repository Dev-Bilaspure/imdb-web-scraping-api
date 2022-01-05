const express = require('express');
const dotenv = require('dotenv');
const  cors = require('cors');
const mostPopularScrapper = require('./scrappers/mostPopularScrapper');
const movieCalanderScrapper = require('./scrappers/movieCalanderScrapper');
const movieNewsScrapper = require('./scrappers/movieNewsScrapper');
const seatchMovieScrapper = require('./scrappers/searchMovieScrapper');

const app = express();
app.use(express.json())
dotenv.config();
app.use(cors());

let arr = []
app.get('/api/movies/popular', async(req,res) => {
    try {
        console.log('waiting...');
        await mostPopularScrapper().then(resArray =>{
            // console.log(resArray);
            arr=resArray;
        })
    } catch(error) {
        console.log(error);
    }
    let status = 'error'
    if(arr.length)
        status = 'success';
    res.json({status, arr, totalItems: arr.length});
});

app.get('/api/movies/upcomings', async(req, res) => {
    try {
        console.log('waiting...');
        await movieCalanderScrapper().then(resArray => {
            // console.log(resArray);
            arr=resArray;
        })
    }catch(error) {
        console.log(error);
    }
    let status = 'error'
    if(arr.length)
        status = 'success';
    res.json({status, arr, totalItems: arr.length});
});


app.get('/api/movies/news', async(req, res) => {
    try {
        console.log('waiting...');
        await movieNewsScrapper().then(resArray => {
            console.log(resArray);
            arr = resArray;
        })
    } catch(error) {
        console.log(error);
    }
    let status = 'error';
    if(arr.length)
        status = 'success';
    res.json({status, arr, totalItems: arr.length});
});

app.get('/api/movies/title/:movietitle', async(req, res) => {  // if movie title have spaces then it must formated as: eg: 'bhoot+police'
    try {
        let { movietitle } = req.params;
        if(movietitle.indexOf(' ')===-1) {
            await seatchMovieScrapper(movietitle).then(resArray => {
                console.log(resArray);
                arr = resArray;
            })
        }
    } catch(error) {
        console.log(error);
    }
    let status = 'error';
    if(arr.length)
        status = 'success';
    res.json({status, arr, totalItems: arr.length});
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})