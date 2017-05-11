import React from 'react';
import Client from './Client';
import {debounce} from 'throttle-debounce';

class LibrarySearch extends React.Component {

  state = {
      librariesMatchingSearch: [],
      librariesMatchingSearchCount: 0,
      searchValue: '',
  };

  handleSearchChange = (e) => {
      const searchValue = e.target.value;

      this.setState({
          searchValue: searchValue,
      });

      if (searchValue === '') {
          this.setState({
              librariesMatchingSearch: [],
              librariesMatchingSearchCount: 0,
          });
      } else {
          this.setState({});

          Client.searchCdnJs(searchValue, (librariesMatchingSearch) => {
              this.setState({
                  librariesMatchingSearch: librariesMatchingSearch.results.slice(0, 50),
                  librariesMatchingSearchCount: librariesMatchingSearch.total,
              });
          });
      }
  };

  render() {
    const { librariesMatchingSearch } = this.state;

    const libraryItems = librariesMatchingSearch.map((library, idx) => (
        <div key={library.name} className="library-item col-sm-6 col-md-4 col-lg-3">
          <div className="thumbnail">
              <div className="caption">
                <h3>{library.name}</h3>
                <p><strong>Version:</strong> {library.version}</p>
                <p><strong>Description:</strong> {library.description}</p>
                <p><strong>Keywords:</strong> {library.keywords ? library.keywords.join(", ") : ''}</p>
                <p>
                  <a href={library.repository.url} className="btn btn-primary" role="button">Repository</a>
                  <a href={library.homepage} className="btn btn-default" role="button">Homepage</a>
                </p>
              </div>
          </div>
        </div>
    ));

    return (
        <div id="library-search" className="col-lg-12 foo">
          <div className="row">
            <div className='col-lg-12'>
              <input
                  className='form-control'
                  type='text'
                  placeholder='Begin typing to search cdnjs libraries...'
                  value={this.state.searchValue}
                  onChange={this.handleSearchChange.bind(this)}
              />
            </div>
          </div>
          <div id="library-results" className="row">
              {libraryItems}
          </div>
        </div>
    );
  }
}

export default LibrarySearch;
