/* @flow */
import * as React from 'react';

import Book from './Book';

class Search extends React.Component {
  state = {
    query: '',
  };

  render({ books, moveBook, openSearch }) {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a
            className="close-search"
            onClick={openSearch}
          >
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
              onChange={e => this.setState({ query: e.target.value })}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book => (
              <Book key={book.id} book={book} moveBook={moveBook} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
