This api let you fetch the movie related data using following endpoints. Puppeteer library is used for web scraping on 
'imdb official webapp'. (for educational purpose).


there are 4 endpoints of this api:

http://localhost:5000/api/movies

    1) GET:: /popular  
            => no parameter needed.
            => this provides most popular movies of current time.

    2) GET:: /upcomings 
            => no parameter needed.
            => this provied all upcoming movies in almost next 1 year.

    3) GET:: /news
            => no parameter needed.
            => provides hollywood/bollywood related news

    4) GET:: /title/:movietitle  (for example: /title/free+guy  or /title/spiderman or title/gangs+of+wasseypur)
            => movie title as parameter.
            => top details of 1 to 3 movies related to the search query('movietitle').



// FOR PUPPETEER ERROR ON HEROKU 
https://stackoverflow.com/questions/52225461/puppeteer-unable-to-run-on-heroku
