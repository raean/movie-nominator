import React from 'react';
import '../index.css';

/**
 * Checks if the movie exists in the list of nominations and returns a boolean value.
 */
function checkNominations(nominationsList, imdbID) {
  for (let i = 0 ; i < nominationsList.length ; i++) {
    if (nominationsList[i].imdbID === imdbID) {
      return true;
    }
  }
  return false;
}

/**
 * Renders the Results components which provides a list of the movies found, their title, their year released, their poster as well as a button to nominate the movie.
 */
export function Results(props) {

    const resultsList= props.searchResults;
    const searchPrompt = props.searchPrompt;
    const nominationsList = props.nominationsList;
    
    return(
      <div class="resultsBar" className="ResultsList" >
          <p> Results for "{searchPrompt}":</p>
          <ul>
            {Object.keys(resultsList.Search).map((movie, key) => {
              return(<li> <img src={resultsList.Search[key].Poster} alt='movie' style={{height: "200px"}}></img> <br/> {resultsList.Search[key].Title} ({resultsList.Search[key].Year}) <br/>
              {checkNominations(nominationsList, resultsList.Search[key].imdbID) ?
                <button disabled={true}>Nominate</button>
              :
                <button onClick={() => props.onClick(key)}>Nominate</button>
              }
                </li>)
            })}
          </ul>
      </div>
    )
}