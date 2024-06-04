export class Todo {
    constructor(
        title = "title",
        id = Date.now().toString(36) + Math.random().toString(36),
        description = "task description",
        priority = null,
        dueDate = null,
        listId = null,
        listPosition = null
    ) {
        this.title = title,
        this.id = id,
        this.description = description,
        this.priority = priority,
        this.listPosition = listPosition,
        this.dateCreated = new Date().getDate(),
        this.completedDate = null,
        this.dueDate =
            dueDate === null ? new Date(new Date().setDate(new Date().getDate())) : dueDate,
        this.isComplete = false,
        this.listId = listId,
        this.isArchived = false
    }
}
