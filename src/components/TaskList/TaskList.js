import React from "react";
import PropTypes from 'prop-types';
import {formatDistanceToNow} from "date-fns";
import Task from "../Task/Task";
import "./TaskList.css"
import EditingForm from "../EditingForm/EditingForm";

function TaskList({todos, onDeleted, onCompleted, onEditing, filterData, onEditLabel}) {


    const elements = todos.map((item) => {

        const{id, ...elProps} = item;
        const afterTime = formatDistanceToNow(new Date(item.createdTask));
        let className = 'active';
        let checked = false;
        if(item.completed){
            className = 'completed';
            checked = true;
        }
        if(item.editing){
            className = 'editing'
        }
        if(filterData ==='all') {
            return (
                <li key={id} className={className} >
                    <Task {...elProps}
                          checked={checked}
                          timerTask={afterTime}
                          onCompleted={() => onCompleted(id)}
                          onDeleted={() => onDeleted(id)}
                          onEditing={() => onEditing(id)}/>
                    {item.editing ? (
                        <EditingForm id={id} label={item.label} onEditLabel={onEditLabel}/>
                    ) : null }
                </li>
            )
        }if(className === filterData || className === 'editing'){
            return(
                <li key={id} className={className}>
                    <Task {...elProps}
                          checked={checked}
                          timerTask={afterTime}
                          className={className}
                          onCompleted={()=>onCompleted(id)}
                          onDeleted={()=>onDeleted(id)}
                          onEditing={()=>onEditing(id)}
                    />
                    {item.editing ? (
                        <EditingForm id={id} label={item.label} onEditLabel={onEditLabel}/>
                    ) : null }
                </li>
            )
        }
    })

    return(
        <ul className="todo-list">
            {elements}
        </ul>
    )

}
TaskList.defaultProps = {
    filterData: 'all',
    todos: () => {},
    onCompleted: () => {},
    onDeleted: () => {},
    onEditing: () => {},
    onEditLabel: () => {}
}
TaskList.propTypes = {
    filterData: PropTypes.string,
    todos: PropTypes.instanceOf(Array),
    onCompleted: PropTypes.func,
    onDeleted: PropTypes.func,
    onEditing: PropTypes.func,
    onEditLabel: PropTypes.func
}

export default TaskList;