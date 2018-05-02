import * as types from './actionTypes';

export const addTodo = text => ({ type: types.ADD_TODO, text })
export const deleteTodo = todo => ({ type: types.DELETE_TODO, todo })
export const saveTodo = (todo, text) => ({ type: types.SAVE_TODO, todo, text })
export const toggleTodo = todo => ({ type: types.TOGGLE_TODO, todo })
export const toggleAllTodos = (checked) => ({ type: types.TOGGLE_ALL_TODOS, checked })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
export const clearAll = () => ({ type: types.CLEAR_ALL })
export const setVisibilityFilter = filter => ({ type: types.SET_VISIBILITY_FILTER, filter})
