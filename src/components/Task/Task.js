import React from "react";
import PropTypes from "prop-types";
import "./Task.css";

function Task({label, checked,onDeleted,onCompleted, onEditing, timerTask}) {

            return (
                <div className='view'>
                    <input className='toggle' type='checkbox' checked={checked}
                           onClick={onCompleted} />
                    <label>
                        <span className='description'>{label}</span>
                        <span className='created'>created {timerTask}</span>
                        <button type='button' className="icon icon-edit"
                        onClick={onEditing}
                        aria-label="Edit"/>
                        <button type='button' className="icon icon-destroy"
                                onClick={onDeleted}
                        aria-label="Deleted"/>
                    </label>
                </div>
            )

}

Task.defaultProps = {
    label: 'Задача без названия',
    checked: false,
    timerTask: () => {},
    onDeleted: () => {},
    onCompleted: () => {},
    onEditing: () => {},
}

Task.propTypes ={
    label: PropTypes.string,
    checked: PropTypes.bool,
    timerTask: PropTypes.string,
    onDeleted: PropTypes.func,
    onEditing: PropTypes.func,
    onCompleted: PropTypes.func,
}

export default Task;