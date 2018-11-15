import React, { Component } from 'react';

class Row extends Component {
  handleClick = () => {
    this.props.onClick(this.props.index, this.props.book);
  }

  render(){
    const {book} = this.props;

    return (
      <tr onClick={this.handleClick}>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.language}</td>
        <td>{book.first_published}</td>
        <td>{book.approximate_sales}</td>
      </tr>
    );
  }
}

export default Row;
