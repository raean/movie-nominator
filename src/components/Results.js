import React from 'react';
import '../index.css';


export function Results(props) {

    const resultsList= props.searchResults;
    const searchPrompt = props.searchPrompt;
    
    return(
      <div class="resultsBar" className="ResultsList" >
          <p> Results for "{searchPrompt}":</p>
          <ul>
            {Object.keys(resultsList.Search).map((movie, key) => {
              return(<li> <img src={resultsList.Search[key].Poster} alt='movie' style={{height: "200px"}}></img> {resultsList.Search[key].Title} ({resultsList.Search[key].Year}) 
              {props.nominationsList[resultsList.Search[key].imdbID] &&
                <button disabled={true} onClick={() => props.onClick(resultsList, resultsList.Search[key].imdbID)}>Nominate</button>
              }
              {!props.nominationsList[resultsList.Search[key].imdbID] &&
                <button onClick={() => props.onClick(resultsList.Search[key].imdbID)}>Nominate</button>
              }
                </li>)
            })}
          </ul>
      </div>
    )
}