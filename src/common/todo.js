import Toolkit from './util';

/**
 * Todo类
 */
class Todo {
  constructor ({ uuid, completed, title }) {
    this.uuid = uuid;
    this.completed = completed;
    this.title = title;
  }
}

/**
 * 创建Todo实例
 * @param {string} title
 */
export function createTodo (title) {
  return new Todo({
    uuid: Toolkit.util.uuid(),
    completed: false,
    title: title
  })
}

/**
 * 新增一条Todo
 * @param {Array} todolist
 * @param {String} value
 */
export function addTodo (todolist, value) {
  const _todos = todolist.slice();
  _todos.unshift(createTodo(value));
  return _todos;
}

/**
 * 修改Todo的title
 * @param {Array} todolist
 * @param {Object} todoToSave
 * @param {String} text
 */
export function saveTodo(todolist, todoToSave, text) {
  return todolist.map((todo) => {
    return todo === todoToSave ? Object.assign({}, todo, {title: text}) : todo;
  })
}

/**
 * 选中与否（是否标记完成）
 * @param {Array} todolist
 * @param {Object} todoToToggle
 */
export function toggleTodo (todolist, todoToToggle) {
  return todolist.map((todo) => {
    return todo === todoToToggle ? Object.assign({}, todo, {completed: !todo.completed}) : todo;
  });
}

/**
 * 删除
 * @param {Array} todolist
 * @param {Object} todoToDelete
 */
export function deleteFromTodo (todolist, todoToDelete) {
  return todolist.filter((todo) => {
    return todo !== todoToDelete;
  });
}

/**
 * 全选
 * @param {Array} todolist
 * @param {Boolean} checked
 */
export function toggleAll (todolist, checked) {
  return todolist.map((todo) => {
    return Object.assign({}, todo, {completed: checked})
  });
}

/**
 * 清除所有已完成项
 * @param {Array} todolist
 */
export function clearCompleted (todolist) {
  return todolist.filter((todo) => {
    return !todo.completed;
  });
}