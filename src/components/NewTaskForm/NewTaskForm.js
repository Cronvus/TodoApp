import React, {Component} from "react";
import "./NewTaskForm.css";

export default class NewTaskForm extends Component{

    render() {
        return (
        <header className='header'>
            <h1>todos</h1>
            <input className='new-todo'
                   placeholder="What needs to be done?"
                   autoFocus />
        </header>
    );
    }
};

