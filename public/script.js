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
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        
        this.tasks.forEach((task, index) => { 
            const taskItem = document.createElement('li');
            taskItem.className = task.completed ? 'completed' : '';
            
            const taskDescription = document.createElement('span');
            taskDescription.textContent = task.description;
            taskDescription.addEventListener('click', () => this.toggleTaskComplete(index));

            const removeButton = document.createElement('button');
            removeButton.className = 'remove-btn';
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => this.removeTask(index))

            taskItem.appendChild(taskDescription);
            taskItem.appendChild(removeButton);
            taskList.appendChild(taskItem);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const TaskManager = new TaskManager();
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');

    addTaskBtn.addEventListener('click', () => {
        const taskDescription = taskInput.value.trim();
        if(taskDescription){
            TaskManager.addTask(taskDescription);
            taskInput.value = '';
            taskInput.focus();
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter'){
            addTaskBtn.click();
        }
    });
});
