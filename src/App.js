import React from 'react';
import * as BooksAPI from './BooksAPI';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import BookList from './BookList';
import Search from './Search';

class BooksApp extends React.Component {
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  state = {
    books: [],
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

  render() {
    return (
      <div className="app">
        <Router>
          <div>
            <Route
              exact
              path="/"
              component={() => (
                <BookList
                  books={this.state.books}
                  moveBook={this.moveBook}
                />
              )}
            />
            <Route
              path="/search"
              component={() => (
                <Search
                  moveBook={this.moveBook}
                />
              )}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default BooksApp;
