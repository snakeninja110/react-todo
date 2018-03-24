import React, { Component } from 'react';

export default class Item extends Component {
  render () {
    const todos = this.props.todos;

    const item = todos.map((item, index) => {
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
          <input className="edit" defaultValue={item.title}/>
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