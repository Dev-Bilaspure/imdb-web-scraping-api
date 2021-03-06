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

const PORT = process.env.PORT || 5000

let arr = []
app.get('/api/movies/popular', async(req,res) => {
  try {
    console.log('waiting...');
    await mostPopularScrapper().then(resArray =>{
      arr=resArray;
      res.json({status: 'success', arr, totalItems: arr.length});
    }).catch(err => {
      console.log(err);
      res.json({status: 'error', arr, totalItems: arr.length});
    })
  } catch(error) {
    console.log(error);
    res.json({status: 'error', arr, totalItems: arr.length});
  }
  // let status = 'error'
  // if(arr.length)
  //   status = 'success';
  // res.json({status, arr, totalItems: arr.length});
});

app.get('/api/movies/upcomings', async(req, res) => {
  try {
    console.log('waiting...');
    await movieCalanderScrapper().then(resArray => {
      arr=resArray;
      res.json({status: 'success', arr, totalItems: arr.length});
    }).catch(err => {
      console.log(err);
      res.json({status: 'error', arr, totalItems: arr.length});
    })
  }catch(error) {
    console.log(error);
    res.json({status: 'error', arr, totalItems: arr.length});
  }
  // let status = 'error'
  // if(arr.length)
  //   status = 'success';
  // res.json({status, arr, totalItems: arr.length});
});


app.get('/api/movies/news', async(req, res) => {
    try {
      console.log('waiting...');
      await movieNewsScrapper().then(resArray => {
        arr = resArray;
        res.json({status: 'success', arr, totalItems: arr.length});
      }).catch(err => {
        console.log(err);
        res.json({status: 'error', arr, totalItems: arr.length});
      })
    } catch(error) {
        console.log(error);
        res.json({status: 'error', arr, totalItems: arr.length});
    }
    // let status = 'error';
    // if(arr.length)
    //     status = 'success';
    // res.json({status, arr, totalItems: arr.length});
});

app.get('/api/movies/title/:movietitle', async(req, res) => {  // if movie title have spaces then it must formated as: eg: 'bhoot+police'
  try {
    let { movietitle } = req.params;
    if(movietitle.indexOf(' ')===-1) {
      await seatchMovieScrapper(movietitle).then(resArray => {
        arr = resArray;
        res.json({status: 'success', arr, totalItems: arr.length});
      }).catch(err => {
        console.log(err);
        res.json({status: 'err', arr, totalItems: arr.length});
      })
    }
  } catch(error) {
    console.log(error);
    res.json({status: 'err', arr, totalItems: arr.length});
  }
  // let status = 'error';
  // if(arr.length)
  //   status = 'success';
  // res.json({status, arr, totalItems: arr.length});
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})