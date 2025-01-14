import React,{Component} from "react";

import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";

export default class App extends Component{

    maxId = 100;

    state = {
        todoData: [
            {label: "Completed task", completed: true, checked: true, editing: false, id: '1'},
            {label: "Editing task", completed: false, checked: false, editing: true, id: "2"},
            {label: "Active task", completed: false, checked: false, editing: false, id: "3"}
        ]
    }

    deleteItem = (id) => {
        this.setState(({todoData})=>{
            const newArray = todoData.filter((el)=> el.id !== id)
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



    render() {
        return (
            <section className='todoapp'>
                <NewTaskForm />
                <section className="main">
                    <TaskList todos={this.state.todoData}
                              onCompleted = {this.completedItem}
                    onDeleted = {this.deleteItem}/>
                    <Footer />
                </section>
            </section>

        );
    }


}