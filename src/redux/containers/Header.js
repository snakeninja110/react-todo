import React, { Component } from 'react';
import { addTodo } from '../actions';
import { connect } from 'react-redux';

// 函数式组件写法
// const Header = ({ dispatch, name }) => {
//   let inputText;
//   return (
//     <header className="header">
//       <h1>{ name }</h1>
//       <input
//         ref={(el) => { inputText = el }}
//         onKeyDown = {e => {
//           if (e.keyCode !== 13) {
//             return;
//           }
//           e.preventDefault();

//           let val = inputText.value;
//           if (val) {
//             dispatch(addTodo(val));
//             inputText.value = '';
//           }
//         }}
//         className="new-todo"
//         placeholder="What needs to be done?"
//       />
//     </header>
//   )
// }
// export default connect()(Header);

// 类组件写法
class Header extends Component {

  handleKeyDown = (e) => {
    if (e.keyCode !== 13) {
      return;
    }
    e.preventDefault();

    let val = this.inputText.value
    if (val) {
      this.props.dispatch(addTodo(val));
      this.inputText.value = '';
    }
  }

  render () {
    // const { add } = this.props;
    return (
      <header className="header">
        <h1>{this.props.name}</h1>
        <input
          ref={(el) => { this.inputText = el }}
          onKeyDown={(e) => this.handleKeyDown(e)}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </header>
    )
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   dispatch
// });

// const mapDispatchToProps = (dispatch) => {
//   return {
//     add: (val) => {
//       dispatch(addTodo(val))
//     }
//   }
// }

export default connect()(Header);
