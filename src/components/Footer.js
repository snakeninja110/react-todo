import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolkit from '../common/util';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, _NAME_ } from '../common/constants';

export default class Footer extends Component {
  constructor () {
    super();
    this.state = {
      todos: Toolkit.util.store(_NAME_),
      nowShowing: ALL_TODOS
    }
  }

  clearCompleted () {
    this.props.eventEmitter.emit('clearCompleted');
  }

  changeShowing (type) {
    this.setState({
      nowShowing: type
    });
    this.props.eventEmitter.emit('nowShowing', type);
  }

  componentDidMount () {
    this.props.eventEmitter.on('updateTodo', (todos) => {
      this.setState({
        todos: todos
      })
    })
  }

  render () {
    const activeTodoCount = this.state.todos.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1;
    }, 0);
    const completedCount = this.state.todos.length - activeTodoCount;
    const item = Toolkit.util.pluralize(activeTodoCount, 'item');

    let clearButton = null;
    if (completedCount > 0) {
      clearButton = (
        <button
          className="clear-completed"
          onClick={() => this.clearCompleted()}>
          Clear completed
        </button>
      )
    }

    let footer = null;
    if (activeTodoCount || completedCount) {
      footer = (
        <footer className="footer" >
          <span className="todo-count">
            <strong>{activeTodoCount}</strong> {item} left
          </span>
          <ul className="filters">
            <li>
              <span
                className={this.state.nowShowing === ALL_TODOS ? 'selected' : ''}
                onClick={() => this.changeShowing(ALL_TODOS)}>All</span>
            </li>
            {' '}
            <li>
              <span
                className={this.state.nowShowing === ACTIVE_TODOS ? 'selected' : ''}
                onClick={() => this.changeShowing(ACTIVE_TODOS)}>Active</span>
            </li>
            {' '}
            <li>
              <span
                className={this.state.nowShowing === COMPLETED_TODOS ? 'selected' : ''}
                onClick={() => this.changeShowing(COMPLETED_TODOS)}>Completed</span>
            </li>
          </ul>
          {clearButton}
        </footer>
      )
    }

    return (footer)
  }
}

Footer.propTypes = {
  count: PropTypes.number,
  completedCount: PropTypes.number
}
