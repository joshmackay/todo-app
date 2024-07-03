export default function Project(name, id = null){
    let _name = name
    let _id = id !== null ? id : Date.now().toString(36) + Math.random().toString(36);
    let _todoList = []

    Object.defineProperties(this, {
        'name': {
            get: function () {
                return _name
            },
            set: function (newTitle) {
                _name = newTitle
            }
        },
        'id': {
            get: function () {
                return _id
            },
        },
        'todoList': {
            get: function () {
                return _todoList
            },
        },
    })

    this.getTodo = function(id){
        if(id !== null)
            return _todoList.find(todo => todo.id === id)
        else
            return _todoList[0]
    }

    this.addTodo = function (todo){
        _todoList.push(todo)
    }

    this.deleteTodo = function(toDelete){
        console.log(toDelete)
        _todoList = _todoList.filter(todo => todo.id !== toDelete.id)
    }

    this.toJSON = function(){
        return{
            name: _name,
            id: _id,
            todoList: _todoList.map(todo => todo.toJSON())
        }
    }
}

