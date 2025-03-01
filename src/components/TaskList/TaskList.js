import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import Task from '../Task/Task';
import './TaskList.css';
import EditingForm from '../EditingForm/EditingForm';

class TaskList extends Component {
  state = {
    todos: this.props.todos.map(todo => ({
      ...todo,
      min: todo.min,
      sec: todo.sec
    }))
  }


  onCount = (id, min, sec) => {
    this.setState(defaultState => {
      const newTodos = defaultState.todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, min, sec }
        }
        return todo;
      })
      return { todos: newTodos }
    })
  }

  render() {
    const { onDeleted, onCompleted, onEditing, onEditLabel, filterData, todos} = this.props
    const elements = todos.map((item) => {
      const { id, min, sec, completed, ...elProps } = item;
      const afterTime = formatDistanceToNow(new Date(item.createdTask));
      let className = 'active';
      let checked = false;

      if (item.completed) {
        className = 'completed';
        checked = true;

      }else if (item.editing) {
        className = 'editing';
      }

      if (filterData === 'all' || (filterData === 'active' && !item.completed) || (filterData === 'completed' && item.completed)) {
        return (
          <li key={id} className={className}>
            <Task
              {...elProps}
              checked={checked}
              completed={completed}
              timerTask={afterTime}
              min={min}
              sec={sec}
              onCompleted={() => onCompleted(id)}
              onDeleted={() => onDeleted(id)}
              onEditing={() => onEditing(id)}
              onCount={this.onCount}
            />
            {item.editing ? <EditingForm id={id} label={item.label} onEditLabel={onEditLabel} /> : null}
          </li>
        );
      }

      return null
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
TaskList.defaultProps = {
  filterData: 'all',
  todos: () => {},
  onCompleted: () => {},
  onDeleted: () => {},
  onEditing: () => {},
  onEditLabel: () => {},
};
TaskList.propTypes = {
  filterData: PropTypes.string,
  todos: PropTypes.instanceOf(Array),
  onCompleted: PropTypes.func,
  onDeleted: PropTypes.func,
  onEditing: PropTypes.func,
  onEditLabel: PropTypes.func,
};

export default TaskList;
