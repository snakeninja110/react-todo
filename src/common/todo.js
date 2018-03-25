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

// 选中与否
export function toggleTodo (todolist, index) {
  const _todos = todolist.slice();
  _todos[index].completed = !_todos[index].completed;
  return _todos;
}

// 删除
export function deleteFromTodo (todolist, index) {
  let _todos = todolist.slice();
  _todos.splice(index, 1);
  return _todos;
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