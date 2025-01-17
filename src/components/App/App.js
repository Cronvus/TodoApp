import React,{Component} from "react";

import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";

export default class App extends Component{

    maxId = 100;

    state = {
        todoData: [
            this.creatItem('Completed task'),
            this.creatItem('Editing task'),
            this.creatItem('Active task')
        ],
        filterData: 'all'
    }

    creatItem(label){
        return{
            label,
            completed: false,
            checked: false,
            editing: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({todoData})=>{
            const newArray = todoData.filter((el)=> el.id !== id)
            return{
                todoData: newArray
            }
        })
    }
    deleteAll = () => {
        this.setState(({todoData})=>{
            const newArray = todoData.filter((el) => !el.completed)
            return{
                todoData: newArray
            }
        })
    }
    addItem = (text) => {

        const newItem = this.creatItem(text);
        this.setState(({todoData}) =>{
            const newArray = [
                ...todoData, newItem
            ]
            return{
                todoData: newArray
            }
        })

    }
    completedItem = (id) => {
        this.setState(({todoData}) =>{
            const newArray = todoData.map((el) =>{
                if(el.id === id){
                    return {
                        ...el,
                        completed: !el.completed
                    }
                }
                return el
            });
            return{
                todoData: newArray,
            }

        })
    }
    editingItem = (id) => {
        this.setState(({todoData}) =>{
            const newArray = todoData.map((el) =>{
                if(el.id === id){
                    return {
                        ...el,
                        editing: !el.editing
                    }
                }
                return el
            });
            return{

                todoData: newArray,

            }

        })
    }

    selectFilterData = (event) => {
        this.setState({
            filterData: event.target.innerText.toLowerCase()
        })
    }


    render() {

        const {todoData} = this.state
        const completeCount = todoData.filter((el) => el.completed).length
        const todoCount = todoData.length - completeCount

        return (
            <section className='todoapp'>
                <NewTaskForm onAdd = {this.addItem}/>
                <section className="main">
                    <TaskList todos={this.state.todoData}
                              filterData = {this.state.filterData}
                              onCompleted = {this.completedItem}
                              onDeleted = {this.deleteItem}
                              onEditing = {this.editingItem}/>
                    <Footer onDelAll = {this.deleteAll}
                            onFilter = {this.selectFilterData}
                            // onFilterCom = {this.filterItemCom}
                            // onFilterAct = {this.filterItemAct}
                            toDo={todoCount}/>
                </section>
            </section>

        );
    }


}