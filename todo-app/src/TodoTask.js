import React, {Component} from 'react';

class TodoTask extends Component {
    constructor(props) {
        super(props);
        this.state = {task: this.props.task}
        this.toggleTask = this.toggleTask.bind(this);
    }

    toggleTask(taskId, e) {
        if(this.props.onTaskComplete)
            this.props.onTaskComplete(taskId);
    }

    render() {
        return (
            <li className="list-group-item" key={this.state.task.id}>
                <input className="task-item-check" type="checkbox" 
                    checked={this.state.task.done} 
                    onChange={(e)=>this.toggleTask(this.state.task.id, e)}/>
                <span className="task-item-text">{this.state.task.text}</span>
            </li>
        )
    }
}

export default TodoTask;