import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './TodoList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Todo in React</h1>
        </header>
        <TodoList savedTasks={[{id:1, done:true, text:'First Task!'}, {id:2, done:false, text:'Second Task'}]}/>
      </div>
    );
  }
}

export default App;
