import React, { Component } from 'react';
import { ACTIVE_TODOS, COMPLETED_TODOS } from '../common/constants';

export default class Item extends Component {
  render () {
    const todos = this.props.todos;
    const nowshowing = this.props.nowShowing;

    const showntodos = todos.filter((todo) => {
      switch (nowshowing) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    }, this);

    const item = showntodos.map((item, index) => {
      return (
        <li className={item.completed ? "completed" : ""} key={item.uuid}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.completed}
              onChange={() => this.props.onToggle(index)}
            />
            <label>{item.title}</label>
            <button className="destroy" onClick={() => this.props.onDelete(index)}></button>
          </div>
          <input
            ref="editField"
            className="edit"
            defaultValue={item.title} />
        </li>
      );
    });

    return (
      <ul className="todo-list">
        {item}
      </ul>
    )
  }
}