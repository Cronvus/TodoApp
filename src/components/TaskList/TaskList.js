import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import Task from '../Task/Task';
import './TaskList.css';
import EditingForm from '../EditingForm/EditingForm';

function TaskList({ todos, onDeleted, onCompleted, onEditing, onEditLabel, filterData, onStart, onPause }){
    const elements = todos.map((item) => {
      const { id, timers, completed, ...elProps } = item;
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
              id={id}
              completed={completed}
              timerTask={afterTime}
              timers={timers}
              onCompleted={() => onCompleted(id)}
              onDeleted={() => onDeleted(id)}
              onEditing={() => onEditing(id)}
              onStart={() => onStart(id)}
              onPause={() => onPause(id)}
            />
            {item.editing ? <EditingForm id={id} label={item.label} onEditLabel={onEditLabel} /> : null}
          </li>
        );
      }

      return null
    });

    return <ul className="todo-list">{elements}</ul>;
}
TaskList.defaultProps = {
  filterData: 'all',
  todos: () => {},
  onCompleted: () => {},
  onDeleted: () => {},
  onEditing: () => {},
  onEditLabel: () => {},
  onStart: () => {},
  onPause: () => {},
};
TaskList.propTypes = {
  filterData: PropTypes.string,
  todos: PropTypes.instanceOf(Array),
  onCompleted: PropTypes.func,
  onDeleted: PropTypes.func,
  onEditing: PropTypes.func,
  onEditLabel: PropTypes.func,
  onStart: PropTypes.func,
  onPause: PropTypes.func,
};

export default TaskList;
