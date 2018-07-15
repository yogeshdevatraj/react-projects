import React, {Component} from "react";
import './TodoList.css';
import TodoTask from './TodoTask';

class TodoList extends Component {
    constructor(props) {
        super(props);
        //Defalut state
        this.state = {tasks : props.savedTasks || [], newTask:''};

        //Bind all handler to have this reference 
        this.addTask = this.addTask.bind(this);
        this.getTaskList = this.getTaskList.bind(this);
        this.toggleTask = this.toggleTask.bind(this);
        this.newTaskInput = null;
        this.onInputChange = this.onInputChange.bind(this);
        this.onEntered = this.onEntered.bind(this);
        //Have reference of input field to have focus : example for ref 
        this.setTaskInputRef = element => {
            this.newTaskInput = element;
        }
    }

    addTask(e) {
        if(this.state.newTask) {
            var newTaskRecord = {
                id: new Date().getTime(), 
                text: this.state.newTask, 
                done:false
            };
            this.state.tasks.push(newTaskRecord);
            this.setState({tasks: this.state.tasks, newTask: ''});
        }
    }

    onInputChange(e) {
        this.setState({newTask:e.target.value});
    }

    onEntered(e) {
        if(e.key === "Enter"){
            debugger;
            this.addTask(e);
            e.preventDefault();
        }
    }

    toggleTask(id, e) {
        const state = this.state; 
        var task = state.tasks.find((t)=>t.id===id);
        task.done=!task.done;
        //this.forceUpdate();
        this.setState(state);
    }

    focusTextInput() {
        // Focus the text input using the raw DOM API
        if (this.newTaskInput) this.newTaskInput.focus();
    }

  
    componentDidMount() {
      // autofocus the input on mount
      this.focusTextInput();
    }

    getTaskList() {
        const taskLIs = this.state.tasks.map((task) => 
            // <li className="list-group-item" key={task.id}>
            //     <input className="task-item-check" type="checkbox" 
            //         checked={task.done} 
            //         onChange={(e)=>this.toggleTask(task.id, e)}/>
            //     <span className="task-item-text">{task.text}</span>
            // </li>
            <TodoTask task={task} onTaskComplete={this.toggleTask}></TodoTask>
        )
        return (
            <ul>
                {taskLIs}
            </ul>
        )
    }

    getStatus() {
        var doneCount = this.state.tasks.reduce((count, task) => {
            if(task.done) 
                count++;
            return count;
        }, 0);
        return (
            <span>{doneCount}/{this.state.tasks.length} are completed </span>
        )
    }

    render() {
        return (
            <div>
                <div className="new-task-section">
                <div className="input-group">
                    <input type="text" className="form-control" ref={this.setTaskInputRef}
                        value={this.state.newTask} 
                        onChange={this.onInputChange}
                        onKeyDown={this.onEntered}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary fa fa-plus" type="button" onClick={this.addTask}></button>
                    </div>
                </div>
                </div>
                <div className="status-section">{this.getStatus()}</div>
                <div className="list-section">
                    <div className="list-group list-group-flush task-list-section">
                        {this.getTaskList()}
                    </div>
                </div>
            </div>
        )
    }
}

export default TodoList;
