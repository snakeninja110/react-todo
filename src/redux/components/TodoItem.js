import React, { Component } from 'react';

import classNames from 'classnames';

export default class Item extends Component {
  constructor (props) {
    super(props);
    this.state = {
      editText: this.props.todo.title,
      editing: false
    }
  }

  onHandleEdit () {
    this.setState({
      editText: this.props.todo.title,
      editing: true
    })
  }

  handleChange (e) {
    const input = e.target;
    this.setState({
      editText: input.value
    })
  }

  handleSubmit = () => {
    const val = this.state.editText.trim();
    if (val) {
      this.props.saveTodo(this.props.todo, val);
    } else {
      this.props.deleteTodo(this.props.todo);
    }
    this.onCancel();
  }

  handleKeyDown (e) {
    if (e.keyCode === 13) {
      this.handleSubmit(e);
    } else if (e.keyCode === 27) {
      this.setState({
        editText: this.props.todo.title
      })
      this.onCancel();
    }
  }

  onCancel = () => {
    this.setState({
      editing: false
    })
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.editing && this.state.editing) {
      this.editField.focus();
      this.editField.setSelectionRange(this.editField.value.length, this.editField.value.length);
    }
  }

  render () {
    const { todo, toggleTodo, deleteTodo} = this.props;

    return (
      <li
        className={classNames({
          completed: todo.completed,
          editing: this.state.editing
        })}
        key={todo.uuid} >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo)}
          />
          <label onDoubleClick={() => this.onHandleEdit(todo)}>{todo.title}</label>
          <button className="destroy" onClick={() => deleteTodo(todo)}></button>
        </div>
        <input
          ref={(el) => {this.editField = el}}
          className="edit"
          value={this.state.editText}
          onChange={e => this.handleChange(e)}
          onKeyDown={e => this.handleKeyDown(e)}
          onBlur={e => this.handleSubmit(e)}
        />
      </li>
    )
  }
}
