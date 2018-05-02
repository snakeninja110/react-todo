import {
  ADD_TODO,
  DELETE_TODO,
  SAVE_TODO,
  TOGGLE_TODO,
  TOGGLE_ALL_TODOS,
  CLEAR_COMPLETED,
  CLEAR_ALL
} from '../actionTypes';
import { addTodo, toggleTodo, deleteFromTodo, toggleAll, clearCompleted, saveTodo } from '../../common/todo';
import Toolkit from '../../common/util';
import { _NAME_ } from '../../common/constants';

/**
 * reducer必须保证是纯函数，返回的必须是个新对象
 * Redux只通过比较新旧两个对象的存储位置来比较新旧两个对象是否相同（浅比较）
 * 如果你在reducer内部直接修改旧的state对象的属性值，那么新的state和旧的state将都指向同一个对象。因此Redux认为没有任何改变，返回的state将为旧的state。
*/

export default function todos (state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      // return [
      //   createTodo(action.text),
      //   ...state
      // ]
      return addTodo(state, action.text);

    case DELETE_TODO:
      return deleteFromTodo(state, action.todo);

    case SAVE_TODO:
      return saveTodo(state, action.todo, action.text);

    case TOGGLE_TODO:
      return toggleTodo(state, action.todo);

    case TOGGLE_ALL_TODOS:
      return toggleAll(state, action.checked);

    case CLEAR_COMPLETED:
      return clearCompleted(state);

    case CLEAR_ALL:
      Toolkit.util.clearStore(_NAME_);
      return [];

    default:
      return state;
  }
}