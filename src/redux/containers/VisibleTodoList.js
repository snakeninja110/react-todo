import { bindActionCreators } from 'redux';
import * as TodoActions from '../actions';
import TodoList from '../components/TodoList';
// import { getVisibleTodos } from '../selectors';
import { connect } from 'react-redux';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../../common/constants';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case COMPLETED_TODOS:
      return todos.filter(t => t.completed)
    case ACTIVE_TODOS:
      return todos.filter(t => !t.completed)
    case ALL_TODOS:
    default:
      return todos
  }
}

const mapStateToProps = state => ({
  shownTodos: getVisibleTodos(state.todos, state.visibilityFilter),
  // activeTodoCount: this.props.activeCount // 此参数可以直接从父组件获取
  // activeTodoCount: getActiveTodoCount(state.todos)
});

// const mapStateToProps = state => {
//   shownTodos: getVisibleTodos(state.todos)
// };

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
});

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;
