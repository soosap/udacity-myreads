import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';

import BookList from './BookList';
import Search from './Search';

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
          <Search
            books={this.state.books}
            moveBook={this.moveBook}
            openSearch={this.openSearch}
          />
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
