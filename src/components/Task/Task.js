import React, {Component} from "react";
import "./Task.css";

export default class Task extends Component{

        render() {
            const {label, checked,onDeleted,onCompleted, onEditing} =this.props




            return (
                <div className='view'>
                    <input className='toggle' type='checkbox' checked={checked}
                           onClick={onCompleted} />
                    <label onClick={onCompleted}>
                        <span className='description'>{label}</span>
                        <span className='created'></span>
                        <button className="icon icon-edit"
                        onClick={onEditing}></button>
                        <button className="icon icon-destroy"
                                onClick={onDeleted}></button>
                    </label>
                </div>
            )
        }



}

