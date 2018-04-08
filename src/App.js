import React, { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import eventEmitter from './common/eventBus';

import './App.css';

class App extends Component {
  constructor () {
    super();
    this.state = {
      name: "Todos"
    };
  }


  componentDidMount () {
    eventEmitter.on('inputAdd', (inputVal) => {
      // console.log(inputVal);
    });

    eventEmitter.on('updateTodo', (todos) => {
      // console.log(todos);
    })
  }

  render () {

    // let main = null, footer = null;


    return (
      <section className="todoapp">
        <Header
          name={this.state.name}
          eventEmitter={eventEmitter} />
        <Main
          // todos={this.state.todos}
          eventEmitter={eventEmitter}
          // count={activeTodoCount}
          // nowShowing={this.state.nowShowing}
          // editing={this.state.editing}
          // onToggle={i => this.handleToggle(i)}
          // onDelete={i => this.handleDelete(i)}
          // onToggleAll={this.handleToggleAll}
          // onEdit={this.handleEdit}
          // onCancel={this.handleCancel}
          // onSave={this.handleSave}
        />
        <Footer
          eventEmitter={eventEmitter}
          // count={activeTodoCount}
          // completedCount={completedCount}
          // nowShowing={this.state.nowShowing}
          // onClearCompleted={this.handleClearCompleted}
          // onNowShowing={this.handelNowShowing}
        />
      </section>
    );
  }
}

export default App;
