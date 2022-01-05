there are 4 endpoints of this api:

http://localhost:5000/api/movies

    1) /popular  
            => no parameter needed.
            => this provides most popular movies of current time.

    2) /upcomings 
            => no parameter needed.
            => this provied all upcoming movies in almost next 1 year.

    3) /news
            => no parameter needed.
            => provides hollywood/bollywood related news

    4) /title/:movietitle  (for example: /title/free+guy  or /title/spiderman or title/gangs+of+wasseypur)
            => movie title as parameter.
            => top details of 1 to 3 movies related to the search query('movietitle').
