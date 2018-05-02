import React, {Component} from 'react';
import TodoItem from './TodoItem';

// const TodoList = ({ shownTodos, activeTodoCount, actions }) => (
//   <section className='main' >
//     <input
//       className="toggle-all"
//       type="checkbox"
//       onChange={ actions.toggleAllTodos }
//       checked={ activeTodoCount === 0 }
//     />
//     <ul className="todo-list">
//       {shownTodos.map(todo =>
//         <TodoItem
//           key={todo.uuid}
//           todo={todo}
//           // nowShowing={nowShowing}
//           // editing={this.state.editing === item.uuid}
//           {...actions}
//         />
//       )}
//     </ul>
//   </section>
// )

class TodoList extends Component {

  componentWillUnmount() {
    // 组件卸载后删除localStorage
    console.log('UnMount');
    // Toolkit.util.clearStore(_NAME_);
  }

  render () {
    const { shownTodos, activeCount, actions } = this.props;
    return (
      <section className='main' >
        <input
          className="toggle-all"
          type="checkbox"
          onChange={ (e) => actions.toggleAllTodos(e.target.checked) }
          checked={ activeCount === 0 }
        />
        <ul className="todo-list">
          {shownTodos.map(todo =>
            <TodoItem
              key={todo.uuid}
              todo={todo}
              {...actions}
            />
          )}
        </ul>
      </section>
    )
  }
}

export default TodoList;
