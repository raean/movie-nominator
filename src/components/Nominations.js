import React from 'react';
import '../index.css';

/**
 * Renders the Nominations components which provides a list of the nominated movies found, their title, their year released, their poster as well as a button to remove the movie from their nominations list.
 */
export function Nominations(props) {

    const nominationsList = props.nominationsList;

    return (
    <div>
    <p>Your Nominations {nominationsList.length}/5:</p>
    <ul> 
    {nominationsList.map((movie, key) => {
            return(
                <li>
                    <img src={movie.Poster} alt='movie' style={{height: "200px"}}></img> <br/>{movie.Title} ({movie.Year})<br/> 
                    <button onClick={() => props.onClick(key)}>Remove</button>
                </li>
            )
            })}
    </ul>
    </div>
    )
}

  