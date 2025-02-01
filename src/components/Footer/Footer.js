import React from "react";
import PropTypes from 'prop-types'
import "./Footer.css"
import TaskFilter from "../TaskFilter/TaskFilter";

function Footer ({onDelAll, toDo, onFilter}){

        return (
            <footer className='footer'>
                <span className="todo-count">{toDo} items left</span>
                <TaskFilter onFilter={onFilter}/>
                <button type='button' className="clear-completed" onClick={onDelAll}>Clear Completed</button>
            </footer>
        )

}

Footer.defaultProps = {
    toDo: 0,
    onDelAll: () => {},
    onFilter: () => {},
}

Footer.propTypes = {
    toDo: PropTypes.number,
    onDelAll: () => {},
    onFilter: () => {},
}

export default Footer
