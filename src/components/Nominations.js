import React from 'react';
import '../index.css';


export function Nominations(props) {

    const nominationsList = props.nominationsList;
    const resultsList = props.searchResults;
    return (
    <div>
    <p>Your Nominations:</p>
    {Object.keys(resultsList.Search).map((movie, key) => {
            return(

            <ul>                
            {nominationsList[resultsList.Search[key].imdbID] &&
                <li>
                    <img src={resultsList.Search[key].Poster} alt='movie' style={{height: "200px"}}></img> {resultsList.Search[key].Title} ({resultsList.Search[key].Year}) 
                    <button onClick={() => props.onClick(resultsList.Search[key].imdbID)}>Remove</button>
                </li>
                }
                </ul>
            )
            })}
        
    </div>
    )
}

  