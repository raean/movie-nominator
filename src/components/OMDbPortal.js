import React from 'react';
import Typed from 'react-typed';
import {Nominations} from './Nominations'
import {Results} from './Results'
import '../index.css';
import Banner from 'react-js-banner';

/**
 * This class is the main parent class that renders the Results, Nominations and the search bar. It also holds the state variables and is responsible for updating the list of search results as well as the nomination results.
 */
export class OMDbPortal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          searchPrompt: "", // Holds the user's search prompt after making the search (static).
          searchRender: "", // Holds the user's search prompt while making the search (dynamically changed).
          searchResults: {}, // Retrieves the JSON response from the OMDb API.
          nominationsList: [], // Holds each movie's JSON object that gets nominated by the user.
          searchMade: false, // checks if the user has made a search.
        };
        this.handleChange = this.handleChange.bind(this);
        this.searchOMDb = this.searchOMDb.bind(this);
      }
    
    /**
     * Handles the change in value of the search bar's input.
     */
    handleChange(value) {
      this.setState({
        searchRender: value
      });
    }
  
    /**
     * Asychronously fetches the JSON response based on the user's input and retrieves back the list of movies. This also updates the state's search prompt and the boolean value to notify the portal that a search was made.
     */
    searchOMDb = async (searchRender) =>  {
      if (this.state.searchRender == "") {
        window.alert("Enter a movie title :)!");
      } else {
        const response = await fetch('http://www.omdbapi.com/?i=tt3896198&apikey=686c061&s=' + searchRender);
        const jsonData = await response.json();
        this.state.searchResults = jsonData;
        this.setState({
          searchResults: this.state.searchResults,
          searchMade: true,
          searchPrompt: searchRender
        });
        console.log("This was made 2");
      }
    }
  
    /**
     * Adds the movie's JSON object if it is nominated based on the index of the search results and updates the state.
     */
    addNomination(index) {
      if (this.state.nominationsList.length == 5) {
        window.alert("You can only have 5 nominations! ;)")
      } else {
        var nominationsListUpdated = this.state.nominationsList;
        nominationsListUpdated.push(this.state.searchResults.Search[index]);
        this.setState({
          nominationsList: nominationsListUpdated
        });
        console.log(nominationsListUpdated);
      }
    }
  
    /**
     * Removes the movie's JSON object from the nominations list and updates the state.
     */
    removeNomination(index) {
      var nominationsListUpdated = this.state.nominationsList.filter(function (item, key) {
        return key != index;
      });
      this.setState({
        nominationsList: nominationsListUpdated
      });  
    }
  
    render() {
      return (
      <div className="Portal"> 
      <h1> The Shoppies </h1>
        <div className ="SearchBar">
          <p>Movie Title:</p>
          <Typed 
          strings={[
              'Search for horror',
              'Search for thriller',
              'Search for action',
              'Search for comedy',
              'Search for documentary',
              'Search for drama']}
              typeSpeed={40}
              backSpeed={50}
              attr="placeholder"
              loop >
          <input className="TypedInputBar" type="text" name="searchInput" value={this.state.searchRender} onChange={e => this.handleChange(e.target.value)}/>
          </Typed>    
          <button onClick={() => this.searchOMDb(this.state.searchRender)}>Search</button>
          </div>
          <div className="ResultsBar">
            {this.state.searchMade && 
            <Results nominationsList={this.state.nominationsList} searchResults={this.state.searchResults} searchPrompt={this.state.searchPrompt} onClick={(imdbID, index) => this.addNomination(imdbID, index)} nominationsList={this.state.nominationsList}/>
            }
          </div>
          <div className="NominationsBar">
            {this.state.searchMade &&
            <Nominations searchResults={this.state.searchResults} nominationsList={this.state.nominationsList} onClick={(imdbID) => this.removeNomination(imdbID)}/>
            }
          </div>
      </div>
      )
    }
  }