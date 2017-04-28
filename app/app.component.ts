import { Component } from '@angular/core';
import { Task } from './interfaces/task';


//view
@Component({
    selector: 'my-app',
    template: `<h1>{{title}}</h1>
                    <table>
                        <tbody>
                            <tr>
                                <th>name</th>
                                <th>content</th>
                                <th>startDate</th>
                                <th>endDate</th>
                                <th>priority</th>
                                <th>status</th>
                                <th></th>
                            </tr>
                            <tr *ngFor="let task of taskList; let i = index;" >
                                <td>{{task.name}}</td>
                                <td>{{task.content}}</td>
                                <td>{{task.startDate}}</td>
                                <td>{{task.endDate}}</td>
                                <td>{{task.priority}}</td>
                                <td>
                                    <input type="checkbox" [(ngModel)] = "task.status">
                                </td>
                                <td>
                                    <button (click)="removeTask(i)">Remove</button>
                                    <button (click)="editTask(i)">Edit</button>
                                </td>                                
                            </tr>
                        </tbody>
                    </table>
                <hr>
                <div *ngIf="!showForm">
                    <button (click)="newTask()">New Task</button>
                </div>
                <div *ngIf="showForm">
                    <div>
                        Name: <input type="text" [(ngModel)] = "buffer.name"> <br>
                        Content: <input type="text" [(ngModel)] = "buffer.content"><br>
                        StartDate: <input type="number" [(ngModel)] = "buffer.startDate"><br>
                        EndDate: <input type="number" [(ngModel)] = "buffer.endDate"><br>
                        Priority: <input type="number" [(ngModel)] = "buffer.priority"><br>
                        Status: <input type="checkbox" [(ngModel)] = "buffer.status"><br>
                    </div>
                    <button *ngIf="showButtonAdd" (click)="addTask()">Add Task</button>
                    <button *ngIf="showButtonUpdate" (click)="updateTask()">Update Task</button>
                    <button (click)="cancel()">Cancel</button>
               </div>
               <users></users>
               <categorys></categorys>
                `
})

//model
export class AppComponent {
    title: String = 'ToDo List';

    showForm: boolean = false;

    showButtonAdd: boolean = false;

    showButtonUpdate: boolean = false;

    indexSelectedTask: number;

    taskList: Task[] = [
            {name: "task1", content: "test task", startDate: 0, endDate: 1, priority: 1, status: true}
    ];

    cleanTask: Task =   {name: "", content: "", startDate: 0, endDate: 0, priority: 0, status: false};

    buffer: Task = Object.assign({}, this.cleanTask);

    addTask() { 
        this.taskList.push(Object.assign({}, this.buffer)); 
        this.showForm = false;
        this.showButtonAdd = false;
    }

    cancel() {
        this.showForm = false;
        this.showButtonAdd = false;
        this.showButtonUpdate = false;
        this.buffer = Object.assign({}, this.cleanTask);
    }

    newTask() {
        this.buffer = Object.assign({}, this.cleanTask);
        this.showForm = true;
        this.showButtonAdd = true;
    }

    removeTask(index: number) {
        this.taskList.splice(index, 1)
    }

    editTask(index: number) {
        this.indexSelectedTask = index;
        this.buffer = Object.assign({}, this.taskList[index]);
        this.showForm = true;
        this.showButtonUpdate = true;
    }

    updateTask() {
        this.taskList[this.indexSelectedTask] = Object.assign({}, this.buffer);
        this.showForm = false;
        this.showButtonUpdate = false;
        this.buffer = Object.assign({}, this.cleanTask);
   }
}