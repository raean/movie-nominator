import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Typed from 'react-typed';


class OMDbPortal extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        searchPrompt: ""
      };
      this.handleChange = this.handleChange.bind(this);
    }
  
  handleChange(value) {
    this.setState({
      searchPrompt: value
    });
  }

  searchOMDb(searchPrompt) {
    console.log("hey");
    fetch('http://www.omdbapi.com/?i=tt3896198&apikey=686c061&t='+searchPrompt)
      .then(response => response.json())
      .then(data => console.log(data));
  }

    render() {
      return (
      <div className="SearchBar"> 
          <Typed
          strings={[
              'Search for horror',
              'Search for thriller',
              'Search for action']}
              typeSpeed={40}
              backSpeed={50}
              attr="placeholder"
              loop >
           <input type="text" name="searchInput" value={this.state.searchPrompt} onChange={e => this.handleChange(e.target.value)}/>
          </Typed>
                        

          <button onClick={() => this.searchOMDb(this.state.searchPrompt)}>Search</button>
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
