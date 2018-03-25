import React, { Component } from 'react';
import Toolkit from '../common/util';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../common/constants';

export default class Footer extends Component {

  changeShowing (type) {
    this.props.onNowShowing(type);
  }

  render () {
    const item = Toolkit.util.pluralize(this.props.count, 'item');
    const completedCount = this.props.completedCount;
    const activeTodoCount = this.props.count;

    let clearButton = null;
    if (this.props.completedCount > 0) {
      clearButton = (
        <button
          className="clear-completed"
          onClick={this.props.onClearCompleted}>
          Clear completed
        </button>
      )
    }

    let footer = null;
    if (activeTodoCount || completedCount) {
      footer = (
        <footer className="footer" >
          <span className="todo-count">
            <strong>{this.props.count}</strong> {item} left
          </span>
          <ul className="filters">
            <li>
              <span
                className={this.props.nowShowing === ALL_TODOS ? 'selected' : ''}
                onClick={() => this.changeShowing(ALL_TODOS)}>All</span>
            </li>
            {' '}
            <li>
              <span
                className={this.props.nowShowing === ACTIVE_TODOS ? 'selected' : ''}
                onClick={() => this.changeShowing(ACTIVE_TODOS)}>Active</span>
            </li>
            {' '}
            <li>
              <span
                className={this.props.nowShowing === COMPLETED_TODOS ? 'selected' : ''}
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
