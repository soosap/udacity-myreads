import * as React from 'react';

const Book = ({ book, moveBook }) => {
  const { title, authors, imageLinks, shelf } = book;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
                `url("${imageLinks.thumbnail || imageLinks.smallThumbnail}")`,
            }}
          />
          <div className="book-shelf-changer">
            <select value={shelf || 'none'} onChange={(e) => moveBook(book, e.target.value)}>
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors && authors.join(', ')}</div>
      </div>
    </li>
  );
};

export default Book;
