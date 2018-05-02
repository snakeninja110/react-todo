import React, { Component } from 'react';
import Item from './Item';
import Toolkit from '../common/util';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, _NAME_ } from '../common/constants';
import { addTodo, toggleTodo, deleteFromTodo, toggleAll, clearCompleted, saveTodo } from '../common/todo';

export default class Main extends Component {
  constructor (props) {
    super(props);
    this.state = {
      todos: Toolkit.util.store(_NAME_),
      editing: null,
      nowShowing: ALL_TODOS
    }
  }

  updateTodo (todos) {
    Toolkit.util.store(_NAME_, todos);
    this.setState({
      todos: todos
    });
    this.handleTodoList(todos);
  }

  handleTodoList = (todos) => {
    this.props.eventEmitter.emit('updateTodo', todos);
  }

  handelNowShowing = (showType) => {
    this.setState({
      nowShowing: showType
    })
  }

  onToggleAll = (event) => {
    const checked = event.target.checked;
    // this.props.onToggleAll(checked);
    const _todos = toggleAll(this.state.todos, checked);
    this.updateTodo(_todos);
  }

  onToggle = (todoToToggle) => {
    const _todos = toggleTodo(this.state.todos, todoToToggle);
    this.updateTodo(_todos);
  }

  onDelete = (todoToDelete) => {
    const _todos = deleteFromTodo(this.state.todos, todoToDelete);
    this.updateTodo(_todos);
  }

  onSave = (todoToSave, text) => {
    const _todos = saveTodo(this.state.todos, todoToSave, text);
    this.setState({
      editing: null
    });
    this.updateTodo(_todos);
  }

  onEdit (item) {
    this.setState({
      editing: item.uuid
    })
  }

  onCancel = () => {
    this.setState({
      editing: null
    })
  }

  onClearCompleted = () => {
    const _todos = clearCompleted(this.state.todos);
    this.updateTodo(_todos);
  }

  componentDidMount () {
    this.props.eventEmitter.on('inputAdd', (inputVal) => {
      const _todos = addTodo(this.state.todos, inputVal);
      this.updateTodo(_todos);
    });

    this.props.eventEmitter.on('nowShowing', (showType) => {
      this.handelNowShowing(showType);
    });

    this.props.eventEmitter.on('clearCompleted', () => {
      this.onClearCompleted();
    });
  }

  componentWillUnmount() {
    // 组件卸载后删除localStorage
    // TODO 当前写法无法调用到此钩子
    console.log('UnMount');
    Toolkit.util.clearStore(_NAME_);
  }

  render () {
    const todos = this.state.todos;
    const nowShowing = this.state.nowShowing;
    const activeTodoCount = this.state.todos.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1;
    }, 0);
    let main = null;

    const showntodos = todos.filter((todo) => {
      switch (nowShowing) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    }, this);

    const items = showntodos.map((item) => {
      return (
        <Item
          key={item.uuid}
          todo={item}
          nowShowing={nowShowing}
          editing={this.state.editing === item.uuid}
          deleteTodo={() => this.onDelete(item)}
          toggleTodo={() => this.onToggle(item)}
          editTodo={() => this.onEdit(item)}
          onCancel={this.onCancel}
          saveTodo={(text) => this.onSave(item, text)}
        />
      )
    })

    if (todos.length) {
      main = (
        <section className='main' >
          <input
            className="toggle-all"
            type="checkbox"
            onChange={this.onToggleAll}
            checked={activeTodoCount === 0}
          />
          <ul className="todo-list">
            {items}
          </ul>
        </section>
      )
    }

    return (main)
  }
}
