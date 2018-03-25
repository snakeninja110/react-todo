import Toolkit from './util';

class Todo {
  constructor ({ uuid, completed, title }) {
    this.uuid = uuid;
    this.completed = completed;
    this.title = title;
  }
}

// 创建实例
export function createTodo (title) {
  return new Todo({
    uuid: Toolkit.util.uuid(),
    completed: false,
    title: title
  })
}

// 新增
export function addTodo (todolist, value) {
  const _todos = todolist;
  _todos.unshift(createTodo(value));
  return _todos;
}

export function saveTodo(todolist, todoToSave, text) {
  return todolist.map((todo) => {
    return todo === todoToSave ? Object.assign({}, todo, {title: text}) : todo;
  })
}

// 选中与否
export function toggleTodo (todolist, todoToToggle) {
  return todolist.map((todo) => {
    return todo === todoToToggle ? Object.assign({}, todo, {completed: !todo.completed}) : todo;
  });
}

// 删除
export function deleteFromTodo (todolist, todoToDelete) {
  return todolist.filter((todo) => {
    return todo !== todoToDelete;
  });
}

export function toggleAll (todolist, checked) {
  return todolist.map((todo) => {
    return Object.assign({}, todo, {completed: checked})
  });
}

export function clearCompleted (todolist) {
  return todolist.filter((todo) => {
    return !todo.completed;
  });
}