import { Injectable } from '@angular/core';
import { Todo } from 'src/app/model/todo.model';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http: HttpClient
  ) { }

  retrieveAllTodos(username): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${API_URL}/users/${username}/todos`);
  }

  deleteTodo(username, id) {
    return this.http.delete(`${API_URL}/users/${username}/todos/${id}`);
  }

  retrieveTodo(username, id) {
    return this.http.get<Todo>(`${API_URL}/users/${username}/todos/${id}`);
  }

  updateTodo(username, id, todo) {
    return this.http.put(
      `${API_URL}/users/${username}/todos/${id}`
      , todo);
  }

  createTodo(username, todo) {
    return this.http.post(
      `${API_URL}/users/${username}/todos`
      , todo);
  }
}
