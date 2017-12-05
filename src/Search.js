/* @flow */
import * as React from 'react';
import * as BooksAPI from './BooksAPI';
import { throttle } from 'throttle-debounce';
import { withRouter } from 'react-router-dom';

import Book from './Book';

class Search extends React.Component {
  state = {
    query: '',
    searchResults: [],
  };

  handleSearch = e => {
    this.setState({ query: e.target.value });
    throttle(
      500,
      e.target.value
        ? BooksAPI.search(e.target.value, 25)
            .then(books => {
              this.setState({ searchResults: books });
            })
            .catch((err) => {
              console.log('err', err);
              this.setState({ searchResults: [] });
            })
        : this.setState({ searchResults: [] }),
    );
  };

  render() {
    const { moveBook, history } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => history.push('/')}>
            Close
          </a>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              value={this.state.query}
              onChange={this.handleSearch}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults &&
              !this.state.searchResults.error &&
              this.state.searchResults.map(book => (
                <Book key={book.id} book={book} moveBook={moveBook} />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default withRouter(Search);
