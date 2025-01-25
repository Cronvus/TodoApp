import React from "react";
import PropTypes from 'prop-types';
import {formatDistanceToNow} from "date-fns";
import Task from "../Task/Task";
import "./TaskList.css"

const TaskList = ({todos, onDeleted, onCompleted, onEditing, filterData}) => {

    const elements = todos.map((item) =>{

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
                <li key={id} className={className}>
                    <Task {...elProps}
                          checked={checked}
                          timerTask={afterTime}
                          onCompleted={() => onCompleted(id)}
                          onDeleted={() => onDeleted(id)}
                          onEditing={() => onEditing(id)}/>
                    <input type='text' className='edit' value='Editing task'/>
                </li>
            )
        }else if(className === filterData || className === 'editing'){
            return(
                <li key={id} className={className} >
                    <Task {...elProps}
                          checked={checked}
                          timerTask={afterTime}
                          className={className}
                          onCompleted={()=>onCompleted(id)}
                          onDeleted={()=>onDeleted(id)}
                          onEditing={()=>onEditing(id)}/>
                    <input type='text' className='edit' value='Editing task'/>
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
}
TaskList.propTypes = {
    filterData: PropTypes.string,
    todos: PropTypes.instanceOf(Array),
    onCompleted: PropTypes.func,
    onDeleted: PropTypes.func,
    onEditing: PropTypes.func,
}

export default TaskList;