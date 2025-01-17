import React, {Component} from "react";
import "./TaskFilter.css";
import {click} from "@testing-library/user-event/dist/click";

export default class TaskFilter extends Component{

    state = {
        btnAll: true,
        btnActive: false,
        btnComplete: false
    }


    onBtnSelected = (event) => {
       const btnClick = event.target.innerText.toLowerCase()
        if(btnClick === 'active'){
            this.setState({
                btnAll: false,
                btnActive: true,
                btnComplete: false
            })
        }
        if(btnClick === 'completed'){
            this.setState({
                btnAll: false,
                btnActive: false,
                btnComplete: true
            })
        }
        if(btnClick === 'all'){
            this.setState({
                btnAll: true,
                btnActive: false,
                btnComplete: false
            })
        }
    }



    render() {
        const {onFilter} = this.props
        const {btnAll, btnActive, btnComplete} = this.state

        return (
            <ul className='filters'>
                <li>
                    <button type='button' className={btnAll ? 'selected' : ''}
                            onClick={(event) =>{
                                onFilter(event);
                                this.onBtnSelected(event)
                    }} >All</button>
                </li>
                <li>
                    <button type='button' className={btnActive ? 'selected' : ''} onClick={(event) =>{
                        onFilter(event);
                        this.onBtnSelected(event)
                    }}>Active</button>
                </li>
                <li>
                    <button type='button' className={btnComplete ? 'selected' : ''} onClick={(event) =>{
                        onFilter(event);
                        this.onBtnSelected(event)
                    }}>Completed</button>
                </li>
            </ul>
        );
    }

};

