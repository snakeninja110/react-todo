import React from 'react';
import VisibleTodoList from '../containers/VisibleTodoList';
import Footer from './Footer';

const MainSection = ({ todos, todosCount, activeCount, actions }) => {
  
  return (
    <section>
      {(todos && todos.length > 0) && 
        <VisibleTodoList activeCount={activeCount}/>
      }
      { !!todosCount && 
        <Footer
          completedCount={todosCount - activeCount}
          activeCount={activeCount}
          clearCompleted={actions.clearCompleted}
        />
      }
    </section>
  )
}

export default MainSection;
