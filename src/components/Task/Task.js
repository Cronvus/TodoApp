import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Task.css';

export default class Task extends Component {


  state ={
    isCount: false
  }

  static defaultProps = {
    label: 'Задача без названия',
    checked: false,
    timerTask: () => {},
    onDeleted: () => {},
    onCompleted: () => {},
    onEditing: () => {},
    onCount: () => {},
  };

  static propTypes = {
    label: PropTypes.string,
    checked: PropTypes.bool,
    timerTask: PropTypes.string,
    onDeleted: PropTypes.func,
    onEditing: PropTypes.func,
    onCompleted: PropTypes.func,
    onCount: PropTypes.func,
    sec: PropTypes.number,
    min: PropTypes.number,
  };

  componentDidUpdate(prevProps) {
    const { min, sec } = this.props;
    if(prevProps.min !== min || prevProps.sec !== sec) {
      this.setState({
        isCount: false
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.counterID)
  }

  minValue = (min) => {
    const { onCount } = this.props;
      const newMin = min - 1
      const newSec = 59
      onCount(this.id, newMin, newSec)
      return { min: newMin, sec: newSec }
  }

  secValue = (min, sec) => {
    const { isCount } = this.state;
    const {  onCount } = this.props;
    if (min === 0 && sec === 0 && isCount) {
      clearInterval(this.counterID)
      this.setState({ isCount: false })
    }else if(sec > 0) {
        const newSec = sec -1
        onCount(this.id, min, newSec)
        return { sec: newSec }
    }else {
      return this.minValue(min)
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
    const { min, sec, onCount } = this.props
    this.counterID = setInterval(() => {
      const newState = this.secValue(min, sec)
      if(newState?.min !== undefined && newState?.sec !== undefined) {
        onCount(this.id, newState.min, newState.sec)
        console.log(newState.min, newState.sec)
      }
    }, 1000)
  }


 render() {
   const { label, checked, onDeleted, onCompleted, onEditing, timerTask, min, sec} = this.props;
   const { isCount } = this.state;
   const buttonTimer = !isCount ?(
     <button type='button' className='icon icon-play' onClick={this.onStart} />
   ) : (<button type='button' className='icon icon-pause' onClick={this.onPause} />)
    return (
      <div className="view" >
        <input className="toggle" type="checkbox" checked={checked}  onClick={onCompleted} />
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




