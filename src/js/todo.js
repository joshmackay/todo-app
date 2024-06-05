export function createTodo(title, id, description, priority, dueDate, listId) {
    const newId = id;
    if(id === 0){
        const newId = Date.now().toString(36) + Math.random().toString(36);
    }

    return {
        newId,
        title,
        description,
        priority,
        dueDate,
        listId
    }
}