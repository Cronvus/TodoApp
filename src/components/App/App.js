import React,{Component} from "react";
import PropTypes from 'prop-types'
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

    static defaultProps = {
        todoData: [
            {
                label: 'Имя не задано',
                completed: false,
                checked: false,
                editing: false,
                id: 100,
                createdTask: new Date()
            }
        ],
        filterData : 'all'
    }

    static propTypes = {
        todoData: PropTypes.instanceOf(Array),
        filterData: PropTypes.string
    }

    creatItem(label){
        return{
            label,
            completed: false,
            checked: false,
            editing: false,
            id: this.maxId++,
            createdTask: new Date(),
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
                            toDo={todoCount}/>
                </section>
            </section>

        );
    }

}