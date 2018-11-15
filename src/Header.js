import React, { Component } from 'react';

class Header extends Component {
  handleClick = () => {
    if (this.props.header.sortable)
      this.props.onClick(this.props.header.key);
  }
  renderArrow = () => {
    const {isActive, direction} = this.props;

    if(!isActive){
      return null
    } else {
      return direction === "asc" ? <span>&#128316;</span> : <span>&#128317;</span>
    }
  }
  render(){
    const {header, isActive} = this.props;

    return (
      <th onClick={this.handleClick}>
        {isActive ? <u>{header.title}</u> : header.title}
        {this.renderArrow()}
      </th>
    );
  }
}

export default Header;
