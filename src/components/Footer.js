import React, {Component} from 'react';
import Toolkit from '../common/util';

// const ALL_TODOS = 'all';
// const ACTIVE_TODOS = 'active';
// const COMPLETED_TODOS = 'completed';

export default class Footer extends Component {

  render() {
    const todos = this.props.todos;
    const ifShow = !todos.length ? 'footer hidden' : 'footer ';
    const item = Toolkit.util.pluralize(this.props.count, 'item');

    return (
      <footer className={ifShow} >
        <span className="todo-count">
          <strong>{this.props.count}</strong> {item} left
        </span>
        <ul className="filters">
          <li>
            <a href="#/" className="selected" >All</a>
          </li>
          {' '}
          <li>
            <a href="#/active" className="" >Active</a>
          </li>
          {' '}
          <li>
            <a href="#/completed" className="" >Completed</a>
          </li>
        </ul>
        <button className="clear-completed" >Clear completed</button>
      </footer>
    )
  }
}
