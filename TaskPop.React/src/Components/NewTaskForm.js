import React, {Component} from "react";

class NewTaskForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',
        date: '',
      };
  
      this.handleTaskChange = this.handleTaskChange.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleTaskChange(event) {
      this.setState({value: event.target.value});
    }

    handleDateChange(event) {
      this.setState({date: event.target.value})
    }
  
    handleSubmit(event) {
      event.preventDefault();
      this.props.handleData(this.state);
      this.setState({value: ''});
      this.setState({date: ''});
    }
  
    render() {
      return (
        <form className="taskForm" onSubmit={this.handleSubmit}>
          <label htmlFor="createTask"><strong>Enter a new task</strong></label>
          <div id="createTask">
              <input type="text" placeholder="Short description of task" value={this.state.value} onChange={this.handleTaskChange}></input>
              <input type="date" value={this.state.date} onChange={this.handleDateChange}></input>
              <input id="addTask" type="submit" value="Add"></input>
          </div>
        </form>
      );
    }
  }

  export default NewTaskForm;