import React, {Component} from "react";
import NewTaskForm from "./NewTaskForm"

class TaskList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        counter: 0,
        itemList: [],
        currentTask: '',
        currentDate: '',
        input: '',
    };
  
      this.completeTask = this.completeTask.bind(this);
      this.handleParentData = this.handleParentData.bind(this);
      this.displayTask = this.displayTask.bind(this);
      this.discardTask = this.discardTask.bind(this);
    }
  
    completeTask() {
        if (this.state.itemList.length > 0) {
            this.discardTask();
            this.setState(({ counter }) => ({ counter: counter + 1 }));
            this.displayTask();
        }
    }

    discardTask() {
        var array = this.state.itemList;
        var index = array.findIndex(a => a.task === this.state.currentTask);
        if (index > -1) {
            if (index !== this.state.itemList.length - 1) {
                array.splice(index, 1);
                this.setState({ itemList: array });
            } else {
                array.pop();
                this.setState({ itemList: array })
            }
        }

        this.displayTask();
    }

    handleParentData(formData) {
        var listItem = {task: formData.value, date: formData.date, completed: false};
        this.state.itemList.push(listItem);
        if (this.state.itemList.length === 1) {
            this.displayTask();
        }
    }

    displayTask() {
        var length = this.state.itemList.length;

        if (length > 0) {
            var index = Math.floor(Math.random() * length);
            this.setState({ currentTask: this.state.itemList[index].task });
            var listDate = new Date(this.state.itemList[index].date);
            var listDateString = new Date(listDate.getTime() + listDate.getTimezoneOffset() * 60000).toDateString();
            this.setState({ currentDate: listDateString });
        } else {
            this.setState({ currentTask: ''});
            this.setState({ currentDate: ''});
        }
    }
  
    render() {
        let inputStyle = {
            color: 'black'
          };
        var today = new Date()
        var convertToday = new Date(today.getTime() + today.getTimezoneOffset() * 60000);
        convertToday.setHours(0,0,0,0);
        var convertCurrentDate = new Date(this.state.currentDate);
        convertCurrentDate.setHours(0,0,0,0);
          if(convertCurrentDate < convertToday) {
            inputStyle = {
              color:'red'
            }
        }  
      return (
        <div>
            <div className="taskList">
                <h2>{this.state.currentTask}</h2>
                <h5 style={inputStyle}>{this.state.currentDate}</h5>
                <button className="taskButton" onClick={this.completeTask}>Complete</button>
                <button className="taskButton" onClick={this.discardTask}>Discard</button>
                <button className="taskButton" onClick={this.displayTask}>Shuffle</button>
                <p>{this.state.counter} Completed Tasks</p>
            </div>
            <NewTaskForm handleData={this.handleParentData}/>
        </div>
      );
    }
  }

  export default TaskList;