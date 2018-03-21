import React, { Component } from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  onKeyUp(e) {
    if (e.keyCode === 13 && this.inputText.value) {
      this.props.handleInput(this.inputText.value);
      this.inputText.value = '';
    }
  }

  render () {
    return (
      <div>
        <header className="header">
          <h1>{this.props.name}</h1>
          <input
            ref={(el) => { this.inputText = el }}
            onKeyUp = {this.onKeyUp}
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </header>
      </div>
    )
  }
}
