import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Task.css';

export default class Task extends Component {

  state ={
    min: 12,
    sec: 35,
    isCount: false
  }

  static defaultProps = {
    label: 'Задача без названия',
    checked: false,
    timerTask: () => {},
    onDeleted: () => {},
    onCompleted: () => {},
    onEditing: () => {},
  };

  static propTypes = {
    label: PropTypes.string,
    checked: PropTypes.bool,
    timerTask: PropTypes.string,
    onDeleted: PropTypes.func,
    onEditing: PropTypes.func,
    onCompleted: PropTypes.func,
  };


  minValue = () => {
    const { min } = this.state;
    this.setState({
      min: min - 1,
      sec: 59
    })
  }

  secValue = () => {
    const { min, sec, isCount } = this.state;
    const { onCompleted } = this.props;
    if (min === 0 && sec === 0 && isCount) {
      onCompleted()
      clearInterval(this.counterID)
      this.setState({ isCount: false })
    }
    if(sec > 0) {
      this.setState({
        sec: sec - 1,
        isCount: true
      })
    }else {
      this.minValue()
    }
  }

  onPause = (event) =>{
    event.stopPropagation()
    this.setState({ isCount: false })
    clearInterval(this.counterID)
  }

  onStart = (event) =>{
    event.stopPropagation()
    this.setState({ isCount: true })
    this.counterID = setInterval(() => {
      this.secValue()
    }, 1000)
  }


 render() {
   const { label, checked, onDeleted, onCompleted, onEditing, timerTask } = this.props;
   const { min, sec, isCount } = this.state;
   const buttonTimer = !isCount ?(
     <button type='button' className='icon icon-play' onClick={this.onStart} />
   ) : (<button type='button' className='icon icon-pause' onClick={this.onPause} />)
    return (
      <div className="view">
        <input className="toggle" type="checkbox" checked={checked} onClick={onCompleted} />
        <label>
          <span className='description'>
            {label}
            {buttonTimer}
            <span className='timer-on-task'>{min} : {sec}</span>
          </span>
          <span className='created'>created {timerTask}</span>
          <button type='button' className="icon icon-edit" onClick={onEditing} aria-label="Edit" />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="Deleted" />
        </label>
      </div>
    );
  }
}




