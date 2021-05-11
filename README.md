## The Shoppies! (Movie Nominator Application) 

#### You can find my demo of the web application here: https://raeabunahla.com/movie-nominator/

### Requirements:
Within this application, you will find an interface:
  * To search movies based on their titles via the OMDb API
  * To view the movies' poster, title and year published
  * To select a maximum of 5 nominations

This application is build with ReactJS and has 3 main components:
  * OMDbPortal: The main class component that also holds the state and the search bar, as well as the children components.
  * Results: This is a functional component that renders the searched prompted and search results to the user.
  * Nominations: This is a functional component that renders the list of movies nominated by the user.

Other features:
  * Once a movie is nominated, this information is saved such that the user cannot renominate the movie (by disabling the button).
  * The user will be provided a window alert is they enter nothing in the search prompt or if they have maxed out the maximum number of nominations (5).

### Future plans:
Future plans for this project include:
  * Allowing results to populate live as the user types characters into the search bar
  * Error handling and testing (in the case no movie is found)
  * A more attractive interface!


To run the application, you can run it using `npm start`

