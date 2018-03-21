import React, {Component} from 'react';

export default class Main extends Component {

  render() {
    const todos = this.props.todos;
    const ifShow = !todos.length ? 'main hidden' : 'main ';
    const item = todos.map((item, index) => {
      return (
        <li className={item.completed ? "completed" : ""} key={index}>
          <div className="view">
            <input className="toggle" type="checkbox" defaultChecked={item.completed} onClick={() => this.props.onToggle(index)}/>
            <label>{item.title}</label>
            <button className="destroy" onClick={() => this.props.onDelete(index)}></button>
          </div>
          <input className="edit" defaultValue={item.title}/>
        </li>
      );
    });

    return (
      <section className={ifShow} >
        <input className="toggle-all" type="checkbox" />
        <ul className="todo-list">
          {item}
        </ul>
      </section>
    )
  }
}
