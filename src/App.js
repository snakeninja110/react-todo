import React, { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { addTodo, toggleTodo, deleteFromTodo, toggleAll } from './common/todo';
import Toolkit from './common/util';
import './App.css';

const _NAME_ = '_TODO_';

class App extends Component {
  constructor () {
    super();
    this.state = {
      name: "Todos",
      todos: Toolkit.util.store(_NAME_)
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

  render () {
    const activeTodoCount = this.state.todos.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1;
    }, 0);

    return (
      <section className="todoapp">
        <Header name={this.state.name} handleInput={this.handleInput} />
        <Main
          todos={this.state.todos}
          count={activeTodoCount}
          onToggle={i => this.handleClick(i)}
          onDelete={i => this.handleDelete(i)}
          toggleAll={this.toggleAll}
        />
        <Footer
          todos={this.state.todos}
          count={activeTodoCount}
        />
      </section>
    );
  }
}

export default App;
