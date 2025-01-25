import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Task.css";

export default class Task extends Component{

        static defaultProps = {
            label: 'Задача без названия',
            checked: false,
            timerTask: () => {},
            onDeleted: () => {},
            onCompleted: () => {},
            onEditing: () => {},
        }

        static propTypes ={
            label: PropTypes.string,
            checked: PropTypes.bool,
            timerTask: PropTypes.string,
            onDeleted: PropTypes.func,
            onEditing: PropTypes.func,
            onCompleted: PropTypes.func,
        }


        render() {
            const {label, checked,onDeleted,onCompleted, onEditing, timerTask} =this.props




            return (
                <div className='view'>
                    <input className='toggle' type='checkbox' checked={checked}
                           onClick={onCompleted} />
                    <label onClick={onCompleted}>
                        <span className='description'>{label}</span>
                        <span className='created'>created {timerTask}</span>
                        <button className="icon icon-edit"
                        onClick={onEditing}></button>
                        <button className="icon icon-destroy"
                                onClick={onDeleted}></button>
                    </label>
                </div>
            )
        }



}

