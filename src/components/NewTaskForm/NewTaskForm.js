import React, {Component} from "react";
import "./NewTaskForm.css";

export default class NewTaskForm extends Component{

    state ={
        label: ''
}
    onLabel = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.onAdd(this.state.label)
            this.setState({
                label: '',
            })
    }




    render() {


        return (
        <header className='header'>
            <h1>todos</h1>
            <form className='form-new-todo' onSubmit={this.onSubmit}>
            <input className='new-todo'
                   type='text'
                   onChange={this.onLabel}
                   placeholder="What needs to be done?"
                   value={this.state.label}
                   />
            </form>
        </header>
    );
    }
};

