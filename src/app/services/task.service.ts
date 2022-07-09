import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor( private http: HttpClient) { }

  // get all tasks
  getAll() {
    return this.http.get<Task[]>('http://localhost:5000/tasks');
  }

  // add task
  add(task: any) {
      return this.http.post<Task>(`http://localhost:5000/tasks`, task)
  }

  // delete all task :
  delete(id: any) {
     return this.http.delete(`http://localhost:5000/tasks/${id}`);
  }

  // Changer Status Complated
  complatedStatus(id: any, complated: boolean) {
      return this.http.patch(`http://localhost:5000/tasks/${id}`, {complated: !complated})
  }

  // update task
  update(task: Task) {
   return this.http.put(`http://localhost:5000/tasks/${task.id}`, task)
  }
}
