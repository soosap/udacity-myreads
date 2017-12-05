import * as React from 'react';

import Book from './Book';

const BookShelf = ({ name, books }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => <Book key={book.id} {...book} />)}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
