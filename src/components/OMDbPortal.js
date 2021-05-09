import React from 'react';
import Typed from 'react-typed';
import {Nominations} from './Nominations'
import {Results} from './Results'
import '../index.css';


export class OMDbPortal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          searchPrompt: "",
          searchRender: "",
          searchResults: {},
          nominationsList: {},
          searchMade: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.searchOMDb = this.searchOMDb.bind(this);
      }
    
    handleChange(value) {
      this.setState({
        searchRender: value
      });
    }
  
    searchOMDb = async (searchRender) =>  {
      const response = await fetch('http://www.omdbapi.com/?i=tt3896198&apikey=686c061&s=' + searchRender);
      const jsonData = await response.json();
      this.state.searchResults = jsonData;
      this.setState({
        searchResults: this.state.searchResults,
        searchMade: true,
        searchPrompt: searchRender
      });
    }
  
    addNomination(imdbID) {
      var nominationsListUpdated = this.state.nominationsList;
      nominationsListUpdated[imdbID] = true;
      this.setState({
        nominationsList: nominationsListUpdated
      });
    }
  
    removeNomination(imdbID) {
      var nominationsListUpdated = this.state.nominationsList;
      delete nominationsListUpdated[imdbID];
      this.setState({
        nominationsList: nominationsListUpdated
      });
    }
  
    // Note to self: I feel like the render should not be in this class component.
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
            <Results searchResults={this.state.searchResults} searchPrompt={this.state.searchPrompt} onClick={(imdbID) => this.addNomination(imdbID)} nominationsList={this.state.nominationsList}/>
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