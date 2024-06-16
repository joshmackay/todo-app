export function Todo(title,
                           id = 0,
                           description,
                           priority,
                           dueDate,
                           projectId){
    let newId = id;
    if(id === 0){
        newId = Date.now().toString(36) + Math.random().toString(36);
    }

    return {
        'id': newId,
        title,
        description,
        priority,
        dueDate,
        projectId
    }
}

