import React, { Component } from 'react';

class BookForm extends Component {
  handleAddBook = () => {
    const {newTitle, newAuthor, newLanguage, newPublishedDate, newSales} = this.state;
    
    this.props.onCreate(newTitle, newAuthor, newLanguage, newPublishedDate, newSales);
  }

  handleNewNameChange = (event) => {
    this.setState({newTitle: event.target.value});
  }
  
  handleNewAuthorChange = (event) => {
    this.setState({newAuthor: event.target.value});
  }

  handleNewLanguageChange = (event) => {
    this.setState({newLanguage: event.target.value});
  }

  handleNewPublishedDateChange = (event) => {
    this.setState({newPublishedDate: event.target.value});
  }

  handleNewSalesChange = (event) => {
    this.setState({newSales: event.target.value});
  }
  
  render(){
    return (
      <div>
        <input type="text" placeholder="Nazwa" onChange={this.handleNewNameChange}/>
        <input type="text" placeholder="Autor" onChange={this.handleNewAuthorChange}/>
        <input type="text" placeholder="Language" onChange={this.handleNewLanguageChange}/>
        <input type="text" placeholder="Fist published" onChange={this.handleNewPublishedDateChange}/>
        <input type="text" placeholder="Approximate sales" onChange={this.handleNewSalesChange}/>
        <button onClick={this.handleAddBook}>Dodaj ksiazke</button>
      </div>
    )
  }
}

export default BookForm;
