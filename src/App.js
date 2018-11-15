import React, { Component } from 'react';
import './App.css';
import Row from './Row';
import Header from './Header';
import BookForm from './BookForm';
import axios from 'axios';
import {headers} from './constants';
import update from 'immutability-helper'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: null,
      books: [],
      searchBoxOpened: false,
      query: null,
      sortColumn: 'title',
      sortDirection: 'desc'
    }
  }
  componentDidMount(){
    const {sortColumn, sortDirection} = this.state;

    axios.get('http://localhost:3001/api/v1/books').then(response => {
      this.setState({
        books: this.sortBooks(response.data, sortColumn, sortDirection)
      })
    }).catch(error => console.log(error));
  }

  handleClick = (index, book) => {
    this.setState({
      currentIndex: index
    })
  }

  sortBooks = (books, sortColumn, sortDirection) => {
    return books.sort(function(a,b){
      const firstColumn = (a[sortColumn] || "").toLowerCase();
      const secondColumn = (b[sortColumn] || "").toLowerCase();

      if(sortDirection === "desc")
        return firstColumn > secondColumn ? 1 : -1
      else
        return firstColumn < secondColumn ? 1 : -1
    });
  }

  handleSort = (newSortColumn) => {
    const {sortColumn, sortDirection} = this.state;
    let newSortDirection;

    if(sortColumn !== newSortColumn){
      newSortDirection = "desc"
    } else if(sortColumn === newSortColumn){
      newSortDirection = sortDirection === "desc" ? "asc" : "desc";
    }
    
    const books = this.state.books.slice();
    const newBooks = this.sortBooks(books, newSortColumn, newSortDirection);

    this.setState({
      books: newBooks,
      sortColumn: newSortColumn,
      sortDirection: newSortDirection
    })
  }

  handleCreateBook = (newTitle, newAuthor, newLanguage, newPublishedDate, newSales) => {

    axios.post(
      "http://localhost:3001/api/v1/books",
      {
        book: {
          title: newTitle,
          author: newAuthor,
          language: newLanguage,
          first_published: newPublishedDate,
          approximate_sales: newSales
        }
      }
    ).then(response => {
      console.log('odpowiedz', response)
      const books = update(this.state.books, {
        $push: [response.data]
      });
      
      const {sortColumn, sortDirection} = this.state;
      const newBooks = this.sortBooks(books, sortColumn, sortDirection);

      this.setState({
        books: newBooks
      });
      
    }).catch(error => console.log(error))
  }

  openSearchBox = () => {
    const {searchBoxOpened} = this.state;

    this.setState({
      searchBoxOpened: !searchBoxOpened
    });
  }

  renderSearchBox = () => {
    return (
      <input type="text" placeholder="Szukaj" onChange={this.handleSearchResult} />
    )
  }

  handleSearchResult = (event) => {
    const {query} = this.state;

    this.setState({
      query: event.target.value
    })
  }

  render() {
    const {currentIndex, sortColumn, sortDirection, books, searchBoxOpened, query} = this.state;
    let filteredBooks;

    if(query && query.length > 0)
      filteredBooks = books.filter((book) => {
        const bookText = [book.title, book.author, book.language, book.first_published, book.approximate_sales].join(' ').toLowerCase();

        return bookText.includes(query.toLowerCase());
      });
    else
      filteredBooks = books

    return (
      <div className="App">
        <div className="App-intro"><br/>
          <button onClick={this.openSearchBox}>Szukaj</button>
          {searchBoxOpened && this.renderSearchBox()}
          <table>
            <thead>
              <tr>
                {headers.map((h, index) => {
                  return(
                    <Header header={h} isActive={sortColumn === h.key} direction={sortDirection} onClick={this.handleSort} key={index} />
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((d, index) => {
                return (
                  <Row book={d} isSelected={currentIndex === index} index={index} onClick={this.handleClick} key={index} />
                );
              })}
            </tbody>
          </table><br/>
          <BookForm onCreate={this.handleCreateBook} />
        </div>
      </div>
    );
  }
}

export default App;
