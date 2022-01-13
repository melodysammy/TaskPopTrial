import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  taskResult = '';
  taskDate = '';
  completionCount = 0;
  styleDate = 'taskDateStyle';

  taskList = Array<{task: string, date: string}>();

  title = 'AngularTaskPop';

  deleteTask() {
    var array = this.taskList;
    var index = array.findIndex(a => a.task === this.taskResult);

    if (index > -1) {
      if (index !== this.taskList.length - 1) {
          array.splice(index, 1);
          this.taskList = array;
      } else {
          array.pop();
          this.taskList = array;
      }
    }
    
    this.showTask();
  }

  onCompletion() {
    if (this.taskList.length > 0) {
      this.deleteTask();
      this.completionCount++;
      this.showTask();
    }
  }

  showTask() {
    var length = this.taskList.length;

    if (length > 0) {
        var index = Math.floor(Math.random() * length);
        this.taskResult = this.taskList[index].task;
        var listDate = new Date(this.taskList[index].date);
        var listDateConvert = new Date(listDate.getTime() + listDate.getTimezoneOffset() * 60000);
        var listDateString = listDateConvert.toDateString();
        this.checkDate(listDateConvert);
        this.taskDate = listDateString;
    } else {
        this.taskResult = '';
        this.taskDate = '';
    }
  }

  checkDate(convertTaskDate: Date) {
    var today = new Date()
    var convertToday = new Date(today.getTime() + today.getTimezoneOffset() * 60000);
    convertToday.setHours(0,0,0,0);
    convertTaskDate.setHours(0,0,0,0);
    if(convertTaskDate >= convertToday) {
      this.styleDate = 'taskDateStyle';
    } else {
      this.styleDate = 'taskDateStyleOld';
    }
  }

  onSubmit(taskSubmit: NgForm) {
    var taskItem = {task: taskSubmit.value.task, date: taskSubmit.value.date};
    this.taskList.push(taskItem);
    console.log(this.taskList);
    
    if (this.taskResult == '') {
      this.taskResult = taskSubmit.value.task;
      var listDate = new Date(taskSubmit.value.date);
      var listDateConvert = new Date(listDate.getTime() + listDate.getTimezoneOffset() * 60000);
      var listDateString = listDateConvert.toDateString();
      this.checkDate(listDateConvert);
      this.taskDate = listDateString;
    }

    taskSubmit.reset();
 }
}

