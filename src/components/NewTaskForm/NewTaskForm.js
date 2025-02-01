import React, {Component} from "react";
import "./NewTaskForm.css";
import PropTypes from "prop-types";

export default class NewTaskForm extends Component{

    state = {
        label: ''
    }

    static defaultProps ={
        onAdd: () => {},
    }

    static propTypes = {
        onAdd: PropTypes.func
    }

    onLabel = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()

        const {onAdd} = this.props;
        const {label} = this.state;

        onAdd(label)
            this.setState({
                label: ''
            })
    }




    render() {

        const {label} = this.state


        return (
        <header className='header'>
            <h1>todos</h1>
            <form className='form-new-todo' onSubmit={this.onSubmit}>
            <input className='new-todo'
                   type='text'
                   onChange={this.onLabel}
                   placeholder="What needs to be done?"
                   value={label}
                   />
            </form>
        </header>
    );
    }
};

