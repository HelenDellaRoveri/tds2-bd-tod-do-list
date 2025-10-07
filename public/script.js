class Task{
    constructor(description){ 
        this.description = description;
        this.completed = false;
    }   

    toggleCompleted(){
        this.completed = !this.completed;
    }
}

class TaskManager{
    constructor(){
        this.tasks = [];
    }

    addTask(description){
        const task = new Task(description);
        this.tasks.push(task);
        this.displayTasks(); 
    }

    removeTask(index){
        this.tasks.splice(index, 1);
        this.displayTasks();
    }

    toggleTaskComplete(index){
        this.tasks[index].toggleCompleted();
        this.displayTasks();
    }

    displayTasks(){
        const taskItem = document.createElement('li');
        taskItem.className = task.completed ? 'completed' : '';
        
    
    }
}
