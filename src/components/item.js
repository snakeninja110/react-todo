import React, { Component } from 'react';

import classNames from 'classnames';

export default class Item extends Component {
  constructor (props) {
    super(props);
    this.state = {
      editText: this.props.todo.title
    }
  }

  onHandleEdit (item) {
    this.props.onEdit(item);
    this.setState({
      editText: this.props.todo.title
    })
  }

  handleChange (e) {
    const input = e.target;
    this.setState({
      editText: input.value
    })
  }

  handleSubmit = (e) => {
    const val = this.state.editText.trim();
    if (val) {
      this.props.onSave(val);
    } else {
      this.props.onDelete();
    }
  }

  handleKeyDown (e) {
    if (e.keyCode === 13) {
      this.handleSubmit(e);
    } else if (e.keyCode === 27) {
      this.setState({
        editText: this.props.todo.title
      })
      this.props.onCancel(e);
    }
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.editing && this.props.editing) {
      this.editField.focus();
      this.editField.setSelectionRange(this.editField.value.length, this.editField.value.length);
    }
  }

  render () {
    const todo = this.props.todo;

    return (
      <li
        className={classNames({
          completed: todo.completed,
          editing: this.props.editing
        })}
        key={todo.uuid} >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => this.props.onToggle()}
          />
          <label onDoubleClick={() => this.onHandleEdit(todo)}>{todo.title}</label>
          <button className="destroy" onClick={() => this.props.onDelete()}></button>
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