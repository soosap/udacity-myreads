import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';

import BookList from './BookList';
import Book from './Book';

class BooksApp extends React.Component {
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      console.log('books', books);
      this.setState({ books });
    });
  }

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    query: '',
  };

  moveBook = (book, targetShelf) => {
    const indexOfWhereThisBookIsCurrentlyResidingInBooksArray = this.state.books.findIndex(
      b => {
        return b.id === book.id;
      },
    );

    const updatedBooks = [...this.state.books];
    updatedBooks.splice(
      indexOfWhereThisBookIsCurrentlyResidingInBooksArray,
      1,
      {
        ...book,
        shelf: targetShelf,
      },
    );

    this.setState({
      books: updatedBooks,
    });
    BooksAPI.update(book, targetShelf);
  };

  openSearch = () => {
    this.setState({ showSearchPage: true });
  };

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
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
                {this.state.books.map(book => (
                  <Book key={book.id} book={book} moveBook={this.moveBook} />
                ))}
              </ol>
            </div>
          </div>
        ) : (
          <BookList
            books={this.state.books}
            moveBook={this.moveBook}
            openSearch={this.openSearch}
          />
        )}
      </div>
    );
  }
}

export default BooksApp;
