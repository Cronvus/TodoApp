import React, {Component} from "react";
import "./Footer.css"
import TaskFilter from "../TaskFilter/TaskFilter";

export default class Footer extends Component{
    render() {
        return (
            <footer className='footer'>
                <span className="todo-count">1 items left</span><TaskFilter/>
                <button className="clear-completed">Clear Completed</button>
            </footer>
        )
    }
}

