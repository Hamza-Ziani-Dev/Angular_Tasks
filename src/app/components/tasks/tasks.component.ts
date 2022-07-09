import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
   tasks : Task[] = [];
   resultTask : Task[] = [];

   mytasks : Task ={
     label : "",
     complated: false
   }

   showForm = false;

   search = ""

   // remplir form
   editForm = false;
  constructor( private taskService: TaskService) { }

  ngOnInit(): void {
    this.  getTasks();
  }

  // get all tasks
  getTasks(){
       this.taskService.getAll().subscribe(task =>{
         this.resultTask  = this.tasks =  task;
       })
  }

  // handeleDelete  items
  handeleDelete(id: any){
    this.taskService.delete(id).subscribe(task =>{
      this.tasks = this.tasks.filter(task => task.id != id);
    })
  }

  // handeleadd tasks
  handeleAdd(){
    this.taskService.add(this.mytasks).subscribe(task =>{
      this.tasks = [task ,...this.tasks]
    })
    this.handeleRest();
  }

  // handelerest
  handeleRest(){
    this.mytasks = {
      label : '',
      complated : false,
    }
  }

  // handelestatuscomplated
  handeleStatusComplated( task: Task){
    this.taskService.complatedStatus(task.id, task.complated).subscribe(()=>{
       task.complated = !task.complated
    })
  }

  // remplir les champs des forms
  remplirChamps(task: any){
    this.mytasks = task,
    this.editForm = true
  }


  // update Task
  updateTask(task: any){
    this.taskService.update(this.mytasks).subscribe(task =>{
        this.handeleRest();
        this.editForm = false;
    })
  }

  // search Task
  searchTask(){
      this.resultTask = this.tasks.filter((task) => task.label.toLowerCase().includes(this.search.toLowerCase()))

  }

}
