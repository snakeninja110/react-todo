import React, { Component } from 'react';
import Item from './item';

export default class Main extends Component {

  toggleAll = (event) => {
    const checked = event.target.checked;
    this.props.toggleAll(checked);
  }

  render () {
    const todos = this.props.todos;
    const ifShow = !todos.length ? 'main hidden' : 'main ';

    return (
      <section className={ifShow} >
        <input
          className="toggle-all"
          type="checkbox"
          onChange={this.toggleAll}
          checked={this.props.count === 0}
        />
        <Item
          todos={this.props.todos}
          onDelete={this.props.onDelete}
          onToggle={this.props.onToggle}
        />
      </section>
    )
  }
}
