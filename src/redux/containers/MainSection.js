import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TodoActions from '../actions';
import Main from '../components/Main';
// import { getCompletedTodoCount } from '../selectors';

const getActiveTodoCount = todos => {
  return todos.reduce((count, todo) => {
    return todo.completed ? count : count + 1
  }, 0)
}

const mapStateToProps = (state) => ({
  todos: state.todos,
  todosCount: state.todos.length,
  activeCount: getActiveTodoCount(state.todos)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(TodoActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
