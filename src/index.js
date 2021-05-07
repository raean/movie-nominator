import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Typed from 'react-typed';


class OMDbPortal extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        searchPrompt: "",
        searchResults: {},
        nominationsList: {},
        searchMade: false
      };
      this.handleChange = this.handleChange.bind(this);
      this.searchOMDb = this.searchOMDb.bind(this);
    }
  
  handleChange(value) {
    this.setState({
      searchPrompt: value
    });
  }

  searchOMDb = async (searchPrompt) =>  {
    // fetch('http://www.omdbapi.com/?i=tt3896198&apikey=686c061&t=' + searchPrompt)
    //   .then(response => response.json())
    //   .then(data => result = data);
    const response = await fetch('http://www.omdbapi.com/?i=tt3896198&apikey=686c061&s=' + searchPrompt);
    const jsonData = await response.json();
    this.state.searchResults = jsonData;
    this.setState({
      searchResults: this.state.searchResults,
      searchMade: true
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
    <div className="SearchBar"> 
      <div className ="SearchBar">
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
        <input type="text" name="searchInput" value={this.state.searchPrompt} onChange={e => this.handleChange(e.target.value)}/>
        </Typed>    
        <button onClick={() => this.searchOMDb(this.state.searchPrompt)}>Search</button>
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

class Results extends React.Component {

  render() {
    const resultsList = this.props.searchResults;
    const searchPrompt = this.props.searchPrompt
    console.log(resultsList);
    return(
      <div className="ResultsList" >
          <p> Results for "{searchPrompt}"</p>
          <ul>
          {/* <img src={resultsList.Search[key].Poster} alt='movie'></img> Image Code! */}
            {Object.keys(resultsList.Search).map((movie, key) => {
              return(<li> <img src={resultsList.Search[key].Poster} alt='movie' style={{height: "200px"}}></img> {resultsList.Search[key].Title} ({resultsList.Search[key].Year}) 
              {this.props.nominationsList[resultsList.Search[key].imdbID] &&
                <button disabled={true} onClick={() => this.props.onClick(resultsList, resultsList.Search[key].imdbID)}>Nominate</button>
              }
              {!this.props.nominationsList[resultsList.Search[key].imdbID] &&
                <button onClick={() => this.props.onClick(resultsList.Search[key].imdbID)}>Nominate</button>
              }
                </li>)
            })}
          </ul>
      </div>
    )
  }
}

class Nominations extends React.Component {

  render() {
    const nominationsList = this.props.nominationsList;
    const resultsList = this.props.searchResults;
    return (
      <div>
      <p>Nominations:</p>
      {Object.keys(resultsList.Search).map((movie, key) => {
              return(

            <ul>                
            {nominationsList[resultsList.Search[key].imdbID] &&
                 <li>
                    <img src={resultsList.Search[key].Poster} alt='movie' style={{height: "200px"}}></img> {resultsList.Search[key].Title} ({resultsList.Search[key].Year}) 
                    <button onClick={() => this.props.onClick(resultsList.Search[key].imdbID)}>Remove</button>
                  </li>
                }
                </ul>
             )
            })}
          
      </div>
    )
  }
}


ReactDOM.render(
  <React.StrictMode>
    <OMDbPortal />
  </React.StrictMode>,
  document.getElementById('root')
);

