import React, {Component} from "react";
import "./Footer.css"
import TaskFilter from "../TaskFilter/TaskFilter";

export default class Footer extends Component{
    render() {

        const {onDelAll, toDo, onFilter} = this.props

        return (
            <footer className='footer'>
                <span className="todo-count">{toDo} items left</span>
                <TaskFilter onFilter={onFilter}/>
                <button className="clear-completed" onClick={onDelAll}>Clear Completed</button>
            </footer>
        )
    }
}

