import React, { Component } from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: ''
  };

  static defaultProps = {
    onAdd: () => {},
  };

  static propTypes = {
    onAdd: PropTypes.func,
  };

  onTaskChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }



  onSubmit = (e) => {

    const { onAdd } = this.props;
    const { label, min, sec} = this.state;

    if(e.key === 'Enter') {

      if (label.trim() === '') {
        onAdd("Название не задано", min, sec);
      } else {
        onAdd(label, min, sec)
      }


      this.setState({
        label: '',
        min: '',
        sec: ''

      });
    }
  };

  render() {
    const { label, min, sec } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form className="form-new-todo" onKeyDown={this.onSubmit}>
          <input
            className="new-todo"
            name='label'
            type="text"
            onChange={this.onTaskChange}
            placeholder="What needs to be done?"
            value={label}
          />
          <input className="todo-time" name='min' placeholder="Min" value={min} onChange={this.onTaskChange}/>
          <input className="todo-time" name='sec' placeholder='Sec' value={sec} onChange={this.onTaskChange}/>
        </form>
      </header>
    );
  }
}
