import React from 'react';
import '../index.css';


export function Nominations(props) {

    const nominationsList = props.nominationsList;

    return (
    <div>
    <p>Your Nominations:</p>
    <ul> 
    {nominationsList.map((movie, key) => {
            return(
                <li>
                    <img src={movie.Poster} alt='movie' style={{height: "200px"}}></img> {movie.Title} ({movie.Year}) 
                    <button onClick={() => props.onClick(key)}>Remove</button>
                </li>
            )
            })}
    </ul>
    </div>
    )
}

  