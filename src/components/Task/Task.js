import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Task.css';

class Task extends Component{
  state = {
    isPlaying: false,
  };
  togglePlaying = () => {
    this.setState(prevState => ({
      isPlaying: !prevState.isPlaying}));
  }


  render() {
    const { label, checked, onCompleted, onDeleted, onEditing, timerTask, timers, onStart, onPause } = this.props;
    const timeLeft = `${timers.min< 10 ? '0': ''}${timers.min}:${timers.sec < 10 ? '0' : ''}${timers.sec}`;
    const { isPlaying } = this.state;
    return (
      <div className="view">
        <input className="toggle" type="checkbox" checked={checked} onClick={onCompleted} />
        <label>
          <span className='description'>
            {label}
            <button type='button' className={`icon ${isPlaying ? 'icon-pause' : 'icon-play'}`}
                    onClick={() => {
                      this.togglePlaying();
                      if(isPlaying) {
                        onPause()
                      }else{
                        onStart()
                      }
                    }} />
            <span className='timer-on-task'>{timeLeft}</span>
          </span>
          <span className='created'>created {timerTask}</span>
          <button type='button' className="icon icon-edit" onClick={onEditing} aria-label="Edit" />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="Deleted" />
        </label>
      </div>
    );
  }
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
  timers: { min: 0, sec: 0 },
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
  timers: PropTypes.shape({
    min: PropTypes.number,
    sec: PropTypes.number,
  }),
};
 export default Task
