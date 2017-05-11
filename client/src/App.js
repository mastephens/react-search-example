import React, { Component } from 'react';
import LibrarySearch from './LibrarySearch';

class App extends Component {
  state = {
      librariesMatchingSearch: [],
      librariesMatchingSearchCount: 0,
      searchValue: '',
  }

  render() {
    return (
      <div>
        <div className='navbar navbar-default navbar-static-top'>
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">React Search Example</a>
            </div>
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li className="active"><a href="#"> Home</a></li>
                <li><a href="www.github.com"> Github</a></li>
              </ul>
            </div>
          </div>
        </div>
          <div className='container'>
            <div className="jumbotron">
                <h1>React Search Example</h1>
                <p>
                  This is a simple React application based off of the react-create-app utility.
                </p>
                <p>Api calls to cdnjs are proxied through a Node Express server</p>
              </div>
            <div className='row bs-example'>
              <LibrarySearch />
            </div>
          </div>
      </div>
    );
  }
}

export default App;
