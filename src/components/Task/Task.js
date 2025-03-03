import React from 'react';
import PropTypes from 'prop-types';
import './Task.css';

function Task({ label, checked, onCompleted, onDeleted, onEditing, timerTask, timers, onStart, onPause }){
  const timeLeft = `${timers.min< 10 ? '0': ''}${timers.min}:${timers.sec < 10 ? '0' : ''}${timers.sec}`;
  return (
      <div className="view" >
        <input className="toggle" type="checkbox" checked={checked}  onClick={onCompleted} />
        <label>
          <span className='description'>
            {label}
            <button type='button' className='icon icon-play' onClick={onStart}/>
            <button type='button' className='icon icon-pause' onClick={onPause} />
            <span className='timer-on-task'>{timeLeft}</span>
          </span>
          <span className='created'>created {timerTask}</span>
          <button type='button' className="icon icon-edit" onClick={onEditing} aria-label="Edit" />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="Deleted" />
        </label>
      </div>
    );
}
Task.defaultProps = {
  label: 'Задача без названия',
  checked: false,
  timerTask: "",
  onDeleted: () => {},
  onCompleted: () => {},
  onEditing: () => {},
  onStart: () => {},
  onPause: () => {},
  timers: () => {},
};

Task.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  timerTask: PropTypes.string,
  onDeleted: PropTypes.func,
  onEditing: PropTypes.func,
  onCompleted: PropTypes.func,
  onStart: PropTypes.func,
  onPause: PropTypes.func,
  timers: PropTypes.instanceOf(Array),
};
 export default Task
