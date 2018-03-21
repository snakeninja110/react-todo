import React, { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';

class App extends Component {
  constructor () {
    super();
    this.state = {
      name: "Todos list",
      todos: [
      //   {
      //   completed: false,
      //   title: 'finish exercise'
      // }, {
      //   completed: false,
      //   title: 'lean jsx'
      // }, {
      //   completed: true,
      //   title: 'lean react'
      // }
      ]
    };

  }

  handleInput = (value) => {
    let _todos = this.state.todos.slice();
    _todos.unshift(createTodo(value));

    this.setState({
      todos: _todos
    });
  }

  handleClick = (i) => {
    let todosList = this.state.todos.slice();
    todosList[i].completed = !todosList[i].completed;
    this.setState({
      todos: todosList
    })
  }

  handleDelete = (index) => {
    let _todos = this.state.todos.slice();
    _todos.splice(index, 1);
    this.setState({
      todos: _todos
    });
  }

  render () {
    return (
      <section className="todoapp">
        <Header name={this.state.name} handleInput={this.handleInput} />
        <Main
          todos={this.state.todos}
          onToggle={i => this.handleClick(i)}
          onDelete={i => this.handleDelete(i)} 
        />
        <Footer todos={this.state.todos}/>
      </section>
    );
  }
}

/*
var todolist = {
  name: "todos",
  todos: [{
    completed: false,
    title: 'finish exercise'
  }, {
    completed: false,
    title: 'lean jsx'
  }, {
    completed: true,
    title: 'lean react'
  }]
}
*/

class Todo {
  constructor ({completed, title}) {
    this.completed = completed;
    this.title = title;
  }
}

export function createTodo (title) {
  return new Todo({
    completed: false,
    title: title
  })
}

export default App;
