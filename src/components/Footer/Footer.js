import React, {Component} from "react";
import PropTypes from 'prop-types'
import "./Footer.css"
import TaskFilter from "../TaskFilter/TaskFilter";

export default class Footer extends Component{

    static defaultProps = {
        todo: 0,
        onDelAll: () => {},
        onFilter: () => {},
    }

    static propTypes = {
        todo: PropTypes.number,
        onDelAll: () => {},
        onFilter: () => {},
    }

    render() {

        const {onDelAll, toDo, onFilter} = this.props

        return (
            <footer className='footer'>
                <span className="todo-count">{toDo} items left</span>
                <TaskFilter onFilter={onFilter}/>
                <button type='button' className="clear-completed" onClick={onDelAll}>Clear Completed</button>
            </footer>
        )
    }
}

