import React from 'react';
import '../index.css';

function checkNominations(nominationsList, imdbID) {

  for (let i = 0 ; i < nominationsList.length ; i++) {
    if (nominationsList[i].imdbID === imdbID) {
      return true;
    }
  }
  return false;

}

export function Results(props) {

    const resultsList= props.searchResults;
    const searchPrompt = props.searchPrompt;
    const nominationsList = props.nominationsList;
    
    return(
      <div class="resultsBar" className="ResultsList" >
          <p> Results for "{searchPrompt}":</p>
          <ul>
            {Object.keys(resultsList.Search).map((movie, key) => {
              return(<li> <img src={resultsList.Search[key].Poster} alt='movie' style={{height: "200px"}}></img> {resultsList.Search[key].Title} ({resultsList.Search[key].Year}) 
              {checkNominations(nominationsList, resultsList.Search[key].imdbID) ?
                <button disabled={true}>Nominate</button>
              :
              // {!props.nominationsList[resultsList.Search[key].imdbID] &&
                <button onClick={() => props.onClick(key)}>Nominate</button>
              }
                </li>)
            })}
          </ul>
      </div>
    )
}