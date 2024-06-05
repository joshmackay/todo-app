export function createTodoList(todos){
    const todoList = [];
    let todoCount = 0;

    return {
        createTodo: function (todo){
            todos.push(todo);
            todoCount++
        },
        getTodo: function(id) {
            return todoList.filter((todo) => todo.id === id);
        },
        getTodoList: function() {
            return todoList;
        },
        getTodoCount: function() {
            return todoCount;
        },
        updateTodo: function(todo) {
            let todoIndex = todoList.indexOf(todo);
            todoList[todoIndex] = todo;
        },
        deleteTodo: function(todo) {
            let todoIndex = todoList.indexOf(todo);
            todoList.splice(todoIndex, 1);
        }
    }
}


