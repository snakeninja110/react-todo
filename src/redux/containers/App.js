import React, { Component } from 'react';
import Header from './Header';
import MainSection from './MainSection';

import '../../App.css';

class App extends Component {
  constructor () {
    super();
    this.state = {
      name: "Todos"
    };
  }

  render () {
    return (
      <section className="todoapp">
        <Header
          name={this.state.name}
          />
        <MainSection />
      </section>
    );
  }
}

export default App;
