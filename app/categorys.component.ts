import { Component } from '@angular/core';
import { Category } from './interfaces/category';

@Component({
	selector: 'categorys',
	template: `
			<h1>{{title}}</h1>
			<ul>
				<li *ngFor="let category of categorys; let i = index;">
					id: {{category.id}}, name: {{category.name}}, parentId: {{category.parentId}}, level: {{category.level}}
					<button (click)="removeCategory(i)">Remove</button>
		           <button (click)="editCategory(i)">Edit</button>
				</li>
			</ul>
			<hr>
                <div *ngIf="!showForm">
                    <button (click)="newCategory()">New category</button>
                </div>
                <div *ngIf="showForm">
                    <div>
                        <input type="number" [(ngModel)] = "buffer.id">
                        <input type="text" [(ngModel)] = "buffer.name">
                        <input type="number" [(ngModel)] = "buffer.parentId">
                        <input type="number" [(ngModel)] = "buffer.level">
                        <br>
                        Подвязать под категорию:
                        <div *ngFor="let category of categorys; let i = index;" >
                        <li *ngIf="category.id != buffer.id"  (click)="setCategory(i)">
                            {{category.name}}
                        </li>  
                        </div>                  
                    </div>
                    <button *ngIf="showButtonAdd" (click)="addCategory()">Add category</button>
                    <button *ngIf="showButtonUpdate" (click)="updateCategory()">Update category</button>
                    <button (click)="cancel()">Cancel</button>
               </div>
			`
	})

export class CategorysComponent {

    title: String = 'Category List';

    categorys: Category[] = [
    
    	{  id: 1, name: "category1", parentId: -1, level: 1 },
        {  id: 2, name: "category2", parentId: -1, level: 1 },
        {  id: 3, name: "category3", parentId: -1, level: 1 },
    ]

    showForm: boolean = false;

    showButtonAdd: boolean = false;

    showButtonUpdate: boolean = false;

    indexSelectedCategory: number;

    cleanCategory: Category =   {  id: 0, name: "", parentId: -1, level: 1 };

    buffer: Category = Object.assign({}, this.cleanCategory);

    addCategory() { 
        this.categorys.push(Object.assign({}, this.buffer)); 
        this.showForm = false;
        this.showButtonAdd = false;
    }

    cancel() {
        this.showForm = false;
        this.showButtonAdd = false;
        this.showButtonUpdate = false;
        this.buffer = Object.assign({}, this.cleanCategory);
    }

    newCategory() {
        this.buffer = Object.assign({}, this.cleanCategory);
        this.showForm = true;
        this.showButtonAdd = true;
    }

    removeCategory(index: number) {
    	this.categorys.splice(index, 1)
    }

    editCategory(index: number) {
        this.indexSelectedCategory = index;
        this.buffer = Object.assign({}, this.categorys[index]);
        this.showForm = true;
        this.showButtonUpdate = true;
    }

    updateCategory() {
        this.categorys[this.indexSelectedCategory] = Object.assign({}, this.buffer);
        this.showForm = false;
        this.showButtonUpdate = false;
        this.buffer = Object.assign({}, this.cleanCategory);
   }

   setCategory(index: number) {
        this.buffer.parentId = this.categorys[index].id;
   }

}