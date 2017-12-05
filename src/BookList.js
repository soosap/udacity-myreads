import * as React from 'react';

import BookShelf from './BookShelf';

const BookList = ({ books, moveBook, openSearch }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <BookShelf
          name="Currently Reading"
          books={books.filter(book => book.shelf === 'currentlyReading')}
          moveBook={moveBook}
        />
        <BookShelf
          name="Want to Read"
          books={books.filter(book => book.shelf === 'wantToRead')}
          moveBook={moveBook}
        />
        <BookShelf
          name="Read"
          books={books.filter(book => book.shelf === 'read')}
          moveBook={moveBook}
        />
      </div>
      <div className="open-search">
        <a onClick={openSearch}>Add a book</a>
      </div>
    </div>
  );
};

export default BookList;
