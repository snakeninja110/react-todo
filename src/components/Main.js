import React, { Component } from 'react';
import Item from './item';

export default class Main extends Component {

  toggleAll = (event) => {
    const checked = event.target.checked;
    this.props.toggleAll(checked);
  }

  render () {
    const todos = this.props.todos;
    const nowShowing = this.props.nowShowing;
    let main = null;

    if (todos.length) {
      main = (
        <section className='main' >
          <input
            className="toggle-all"
            type="checkbox"
            onChange={this.toggleAll}
            checked={this.props.count === 0}
          />
          <Item
            todos={todos}
            nowShowing={nowShowing}
            onDelete={this.props.onDelete}
            onToggle={this.props.onToggle}
          />
        </section>
      )
    }

    return (main)
  }
}
