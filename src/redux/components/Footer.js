import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolkit from '../../common/util';
import FilterLink from '../containers/FilterLink';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../../common/constants';

const FILTER_TITLES = {
  [ALL_TODOS]: 'All',
  [ACTIVE_TODOS]: 'Active',
  [COMPLETED_TODOS]: 'Completed'
}

export default class Footer extends Component {
  constructor () {
    super();
    this.state = {
      nowShowing: ALL_TODOS
    }
  }

  changeShowing (type) {
    this.setState({
      nowShowing: type
    });
  }

  render () {
    const { completedCount, activeCount, clearCompleted } = this.props;
    const item = Toolkit.util.pluralize(activeCount, 'item');

    let clearButton = null;
    if (completedCount > 0) {
      clearButton = (
        <button
          className="clear-completed"
          onClick={clearCompleted}>
          Clear completed
        </button>
      )
    }
    
    const footer = (
      <footer className="footer" >
        <span className="todo-count">
          <strong>{activeCount}</strong> {item} left
        </span>
        <ul className="filters">
          { Object.keys(FILTER_TITLES).map((filter) => 
            <li key={filter}>
              <FilterLink filter={filter}>
                {FILTER_TITLES[filter]}
              </FilterLink>
            </li>
          )}
        </ul>
        {clearButton}
      </footer>
    )
    

    return (footer)
  }
}

Footer.propTypes = {
  count: PropTypes.number,
  completedCount: PropTypes.number
}
