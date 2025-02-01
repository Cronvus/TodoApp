import React, { Component } from 'react';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

export default class App extends Component {
  maxId = 100;

  maxname = "den"

  state = {
    todoData: [this.creatItem('Completed task'), this.creatItem('Editing task'), this.creatItem('Active task')],
    filterData: 'all',
  };

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
  addItem = (text) => {
    const newItem = this.creatItem(text);
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
    this.setState({
      filterData: event.target.innerText.toLowerCase(),
    });
  };

  creatItem(label) {
    return {
      label,
      completed: false,
      checked: false,
      editing: false,
      id: this.maxId++,
      createdTask: new Date(),
    };
  }

  render() {
    const { todoData, filterData } = this.state;
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
          />
          <Footer onDelAll={this.deleteAll} onFilter={this.selectFilterData} toDo={todoCount} />
        </section>
      </section>
    );
  }
}
