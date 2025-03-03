import React, { Component } from 'react';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

export default class App extends Component {
  maxId = 100;



  state = {
    todoData: [this.creatItem('Completed task', 0, 5), this.creatItem('Editing task', 15, 0), this.creatItem('Active task', 10, 0)],
    filterData: 'all',
    timers: {},
  };

  startTimer = (id) => {
    this.setState(prevState => {
      const newTimers = {...prevState.timers};
      newTimers[id] = setInterval(() => {
        this.setState(prevStat => {
          const todoData = [...prevStat.todoData];
          const taskId = todoData.findIndex(el => el.id === id);
          if(taskId > -1) {
            const {min, sec} = todoData[taskId].timers;
            if(sec === 0 && min === 0) {
              clearInterval(newTimers[id]);
              delete newTimers[id];
              return {timers: newTimers};
            }
            if(sec === 0) {
              todoData[taskId].timers.min--;
              todoData[taskId].timers.sec = 59;
            } else {
              todoData[taskId].timers.sec--;
            }
          }
          return {todoData};
        });
      }, 1000);
      return {timers: newTimers};
    });
  }

  pauseTimer = (id) => {
    this.setState(prevState => {
      const newTimers = {...prevState.timers};
      clearInterval(newTimers[id]);
      delete newTimers[id];
      return {timers: newTimers};
    });
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => el.id !== id);
      return {
        todoData: newArray,
      };
    });
  };
  deleteAll = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => !el.completed);
      return {
        todoData: newArray,
      };
    });
  };
  addItem = (label, min, sec) => {
    const newItem = this.creatItem(label, min, sec);
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];
      return {
        todoData: newArray,
      };
    });
  };
  completedItem = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            completed: !el.completed,
          };
        }
        return el;
      });
      return {
        todoData: newArray,
      };
    });
  };
  editingItem = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            editing: !el.editing,
          };
        }
        return el;
      });
      return {
        todoData: newArray,
      };
    });
  };
  editingLabel = (id, label) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            label,
            completed: false,
            editing: false,
          };
        }
        return el;
      });
      return {
        todoData: newArray,
      };
    });
  };

  selectFilterData = (event) => {
    const btnClick = event.target.innerText.toLowerCase()
    this.setState({
      filterData: btnClick === 'all' ? 'all' : btnClick === 'active' ? 'active' : 'completed',
    });
  };

  creatItem(label, min , sec) {

    return {
      label,
      completed: false,
      checked: false,
      editing: false,
      id: this.maxId++,
      createdTask: new Date(),
      timers: {min , sec},
    };
  }


  render() {
    const { todoData, filterData} = this.state;
    const completeCount = todoData.filter((el) => el.completed).length;
    const todoCount = todoData.length - completeCount;

    return (
      <section className="todoapp">
        <NewTaskForm onAdd={this.addItem} />
        <section className="main">
          <TaskList
            todos={todoData}
            onAdd={this.addItem}
            filterData={filterData}
            onCompleted={this.completedItem}
            onDeleted={this.deleteItem}
            onEditing={this.editingItem}
            onEditLabel={this.editingLabel}
            onStart={this.startTimer}
            onPause={this.pauseTimer}
          />
          <Footer onDelAll={this.deleteAll} onFilter={this.selectFilterData} toDo={todoCount} />
        </section>
      </section>
    );
  }
}
