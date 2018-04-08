import React, { Component } from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleInput = (value) => {
    this.props.eventEmitter.emit('inputAdd', value);
  }

  handleKeyDown(e) {
    if (e.keyCode !== 13) {
      return;
    }
    e.preventDefault();

    let val = this.inputText.value
    if (val) {
      this.handleInput(val);
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
            onKeyDown = {this.handleKeyDown}
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </header>
      </div>
    )
  }
}
