import React, { Component } from 'react';
import Item from './Item';
import { ACTIVE_TODOS, COMPLETED_TODOS } from '../common/constants';

export default class Main extends Component {

  onToggleAll = (event) => {
    const checked = event.target.checked;
    this.props.onToggleAll(checked);
  }

  render () {
    const todos = this.props.todos;
    const nowShowing = this.props.nowShowing;
    let main = null;

    const showntodos = todos.filter((todo) => {
      switch (nowShowing) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    }, this);

    const items = showntodos.map((item) => {
      return (
        <Item
          key={item.uuid}
          todo={item}
          nowShowing={nowShowing}
          editing={this.props.editing === item.uuid}
          onDelete={() => this.props.onDelete(item)}
          onToggle={() => this.props.onToggle(item)}
          onEdit={this.props.onEdit}
          onCancel={this.props.onCancel}
          onSave={(text) => this.props.onSave(item, text)}
        />
      )
    })

    if (todos.length) {
      main = (
        <section className='main' >
          <input
            className="toggle-all"
            type="checkbox"
            onChange={this.onToggleAll}
            checked={this.props.count === 0}
          />
          <ul className="todo-list">
            {items}
          </ul>
        </section>
      )
    }

    return (main)
  }
}
