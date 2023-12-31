export class Task {
    name: string = '';
    description: string = '';
    isDone: boolean = false;
    order!: number;
    id!: number;

    constructor(name: string, description: string, isDone: boolean = false, order: number = 0) {
        this.name = name;
        this.description = description;
        this.isDone = isDone;
        this.order = order;
    }

    clone() {
        const newTask = new Task(this.name, this.description, this.isDone, this.order);
        newTask.id = this.id;
        return newTask;
    }

}