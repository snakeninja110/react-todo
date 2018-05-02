import { createSelector } from 'reselect';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../../common/constants';

const getVisibilityFilter = state => state.visibilityFilter;
const getTodos = state => state.todos;

export const getVisibleTodos = createSelector(
  [getVisibilityFilter, getVisibleTodos],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case ALL_TODOS:
        return todos;
      case ACTIVE_TODOS:
        return todos.filter(t => !t.completed);
      case COMPLETED_TODOS:
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }
)

export const getCompletedTodoCount = createSelector(
  [getTodos],
  todos => (
    todos.reduce((count, todo) => {
      return todo.completed ? count : count + 1
    }, 0)
  )
)
