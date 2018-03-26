import React, { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { addTodo, toggleTodo, deleteFromTodo, toggleAll, clearCompleted, saveTodo } from './common/todo';
import Toolkit from './common/util';
import { ALL_TODOS } from './common/constants';

import './App.css';

const _NAME_ = '_TODO_';

class App extends Component {
  constructor () {
    super();
    this.state = {
      name: "Todos",
      todos: Toolkit.util.store(_NAME_),
      nowShowing: ALL_TODOS,
      editing: null
    };
    this.updateTodo.bind(this);
  }

  updateTodo (todos) {
    Toolkit.util.store(_NAME_, todos);
    this.setState({
      todos: todos
    });
  }

  handleInput = (value) => {
    const _todos = addTodo(this.state.todos, value);
    this.updateTodo(_todos);
  }

  handleToggle = (todoToToggle) => {
    const _todos = toggleTodo(this.state.todos, todoToToggle);
    this.updateTodo(_todos);
  }

  handleDelete = (todoToDelete) => {
    const _todos = deleteFromTodo(this.state.todos, todoToDelete);
    this.updateTodo(_todos);
  }

  handleToggleAll = (checked) => {
    const _todos = toggleAll(this.state.todos, checked);
    this.updateTodo(_todos);
  }

  handleClearCompleted = () => {
    const _todos = clearCompleted(this.state.todos);
    this.updateTodo(_todos);
  }

  handelNowShowing = (showType) => {
    this.setState({
      nowShowing: showType
    })
  }

  handleEdit = (item) => {
    this.setState({
      editing: item.uuid
    })
  }

  handleCancel = () => {
    this.setState({
      editing: null
    })
  }

  handleSave = (todoToSave, text) => {
    const _todos = saveTodo(this.state.todos, todoToSave, text);
    this.setState({
      editing: null
    });
    this.updateTodo(_todos);
  }

  componentWillUnmount () {
    Toolkit.util.clearStore(_NAME_);
  }

  render () {
    const activeTodoCount = this.state.todos.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1;
    }, 0);
    const completedCount = this.state.todos.length - activeTodoCount;

    return (
      <section className="todoapp">
        <Header name={this.state.name} handleInput={this.handleInput} />
        <Main
          todos={this.state.todos}
          count={activeTodoCount}
          nowShowing={this.state.nowShowing}
          editing={this.state.editing}
          onToggle={i => this.handleToggle(i)}
          onDelete={i => this.handleDelete(i)}
          onToggleAll={this.handleToggleAll}
          onEdit={this.handleEdit}
          onCancel={this.handleCancel}
          onSave={this.handleSave}
        />
        <Footer
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={this.state.nowShowing}
          onClearCompleted={this.handleClearCompleted}
          onNowShowing={this.handelNowShowing}
        />
      </section>
    );
  }
}

export default App;
