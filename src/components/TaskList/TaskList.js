import React from "react";

import Task from "../Task/Task";
import "./TaskList.css"

const TaskList = ({todos, onDeleted, onCompleted}) => {

    const elements = todos.map((item) =>{

        const{id, ...elProps} = item;
        let className = 'active';
        let checked = false;
        if(item.completed){
            className = 'completed';
            checked = true;
        }
        if(item.editing){
            className = 'editing'
        }




        return(
            <li key={id} className={className} >
                <Task {...elProps}
                      checked={checked}
                      onCompleted={()=>onCompleted(id)}
                      onDeleted={()=>{
                          onDeleted(id)
                      }}/>
                <input type='text' className='edit' value='Editing task'/>
            </li>
        )
    })

    return(
        <ul className="todo-list">
            {elements}
        </ul>
    )

}

export default TaskList;