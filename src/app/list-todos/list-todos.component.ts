import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo.model';
import { TodoDataService } from '../service/data/todo-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos: Todo[];
  name = '';

  constructor(private todoService: TodoDataService, private router: Router) { }

  ngOnInit(): void {
    this.refreshTodos();
  }

  refreshTodos(){
    this.todoService.retrieveAllTodos('in28minutes').subscribe(
      response => {
        this.todos = response;
      }
    );
  }

  // deleteTodo(id) {
  //   console.log(`delete todo ${id}` )
  //   this.todoService.deleteTodo('in28minutes', id).subscribe (
  //     response => {
  //       console.log(response);
  //       this.message = `Delete of Todo ${id} Successful!`;
  //       this.refreshTodos();
  //     }
  //   )
  // }

  // updateTodo(id) {
  //   console.log(`update ${id}`)
  //   this.router.navigate(['todos',id])
  // }

  // addTodo() {
  //   this.router.navigate(['todos',-1])
  // }
}
