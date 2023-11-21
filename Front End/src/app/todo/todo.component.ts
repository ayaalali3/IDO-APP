import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CdkDragDrop} from '@angular/cdk/drag-drop';
import { TodoService } from '../todo.service';
interface ToDo {
  title: string;
  category: string;
  dueDate: string;
  estimate: string;
  importance: string;
  status:string;
  editMode?: boolean;
  UserId: number;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{
  constructor(private router: Router,private todoService: TodoService) {}

  
  tasksToDo: ToDo[] = [];
  tasksDoing: ToDo[] = [];
  tasksDone: ToDo[] = [];
  tasks: ToDo[] = [];
  quote: string = 'Anything that can go wrong will go wrong!';
  showQuoteBanner: boolean = true;

hideQuoteBanner() {
  this.showQuoteBanner = false;
}

showQuote() {
  this.showQuoteBanner = true;
}
userId: number = 8; 

ngOnInit(){
    this.fetchTodos();
}
fetchTodos(){
  this.todoService.getTodo().subscribe({
    next: (response: any) => {
      this.tasks =response;
      this.tasks.forEach(todo => {
        if (todo.status === 'To Do') {
          this.tasksToDo.unshift(todo);
        } else if (todo.status === 'Doing') {
          this.tasksDoing.unshift(todo);
        } else if (todo.status === 'Done') {
          this.tasksDone.unshift(todo);
        }
      });
    },
    error: (error: any) => {
      console.error('Error getting ToDos:', error);
    }
  });
}

  addTask() {
    const title:string='';
    const category:string='';
    const dueDate:string= '';
    const estimate:string='';
    const importance:string='';
    const status:string='To Do';
    const userId = 8;

    const newTask: ToDo = {
      title: title,
      category: category,
      dueDate: dueDate,
      estimate: estimate,
      importance: importance,
      status: status,
      UserId: userId
    };
    this.todoService.CreateTodo(newTask).subscribe({
      next: () => {
         this.fetchTodos(); // Refresh the list after adding a new todo
      },
      error: (error: any) => {
        console.error('Error adding ToDo:', error);
      },
    });
    this.tasksToDo.unshift(newTask);
    this.enableEditMode(newTask);
  }

  enableEditMode(todo: ToDo) {
    todo.editMode = true;
  }

  disableEditMode(todo: ToDo) {
    
    todo.editMode = false;
    this.todoService.updateTodo(todo).subscribe({
      next: (response: any) => {
        this.fetchTodos(); // Refresh the list after adding a new todo
      },
      error: (error: any) => {
        console.error('Error updating ToDo:', error);
      },
    });
  }

  drop(event: CdkDragDrop<ToDo[]>, status: string) {
      const task = event.previousContainer.data[event.previousIndex];
      task.status = status;
      if(task.status=='To Do'){
        this.tasksDoing.unshift(task);
        task.status='Doing';
        this.tasksToDo.splice(event.currentIndex,1);
      } else
      if(task.status=='Doing'){
        this.tasksDone.unshift(task);
        task.status='Done';
        this.tasksDoing.splice(event.currentIndex,1);
        this.fetchTodos();
      }
    }

    useremail: string = 'user@exemple.com';

  showTooltip(){
        var tooltip = document.getElementById("myTooltip");
    if(tooltip){
      tooltip.style.visibility = (tooltip.style.visibility === "hidden" || tooltip.style.visibility === "") ? "visible" : "hidden";

    }
  }
  logout(){
    this.router.navigate(['/signin']);
  }
}
