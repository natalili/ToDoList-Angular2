import { Component } from '@angular/core';
import { User } from './interfaces/user';

@Component({
	selector: 'users',
	template: `
			<h1>{{title}}</h1>
			<ul>
				<li *ngFor="let user of users; let i = index;">
					{{user.fName}} {{user.lName}}, age: {{user.age}}
					<button (click)="removeUser(i)">Remove</button>
		           <button (click)="editUser(i)">Edit</button>
				</li>
			</ul>
			<hr>
                <div *ngIf="!showForm">
                    <button (click)="newUser()">New User</button>
                </div>
                <div *ngIf="showForm">
                    <div>
                        <input type="text" [(ngModel)] = "buffer.fName">
                        <input type="text" [(ngModel)] = "buffer.lName">
                        <input type="number" [(ngModel)] = "buffer.age">
                    </div>
                    <button *ngIf="showButtonAdd" (click)="addUser()">Add User</button>
                    <button *ngIf="showButtonUpdate" (click)="updateUser()">Update User</button>
                    <button (click)="cancel()">Cancel</button>
               </div>
			`
	})

export class UsersComponent {

    title: String = 'User List';

    users: User[] = [
    	{ fName: "FName1", lName: "LName1", age: 18 },
    	{ fName: "FName2", lName: "LName2", age: 19 },
    	{ fName: "FName3", lName: "LName3", age: 20 },
    ]

    showForm: boolean = false;

    showButtonAdd: boolean = false;

    showButtonUpdate: boolean = false;

    indexSelectedUser: number;

    cleanUser: User =   { fName: "", lName: "", age: 0 };

    buffer: User = Object.assign({}, this.cleanUser);

    addUser() { 
        this.users.push(Object.assign({}, this.buffer)); 
        this.showForm = false;
        this.showButtonAdd = false;
    }

    cancel() {
        this.showForm = false;
        this.showButtonAdd = false;
        this.showButtonUpdate = false;
        this.buffer = Object.assign({}, this.cleanUser);
    }

    newUser() {
        this.buffer = Object.assign({}, this.cleanUser);
        this.showForm = true;
        this.showButtonAdd = true;
    }

    removeUser(index: number) {
    	this.users.splice(index, 1)
    }

    editUser(index: number) {
        this.indexSelectedUser = index;
        this.buffer = Object.assign({}, this.users[index]);
        this.showForm = true;
        this.showButtonUpdate = true;
    }

    updateUser() {
        this.users[this.indexSelectedUser] = Object.assign({}, this.buffer);
        this.showForm = false;
        this.showButtonUpdate = false;
        this.buffer = Object.assign({}, this.cleanUser);
   }

}