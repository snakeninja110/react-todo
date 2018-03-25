import React, { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { addTodo, toggleTodo, deleteFromTodo, toggleAll, clearCompleted } from './common/todo';
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
      nowShowing: ALL_TODOS
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

  handleClick = (index) => {
    const _todos = toggleTodo(this.state.todos, index);
    this.updateTodo(_todos);
  }

  handleDelete = (index) => {
    const _todos = deleteFromTodo(this.state.todos, index);
    this.updateTodo(_todos);
  }

  toggleAll = (checked) => {
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
          onToggle={i => this.handleClick(i)}
          onDelete={i => this.handleDelete(i)}
          toggleAll={this.toggleAll}
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
