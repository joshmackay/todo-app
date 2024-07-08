export function Project(name, id = null){
    let _name = name
    let _id = id !== null ? id : Date.now().toString(36) + Math.random().toString(36);
    let _todoList = []
    let _sortableId
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
        'sortableId': {
            get: function(){
                return _sortableId
            },
            set: function(sortableId){
                _sortableId = sortableId
            }
        }
    })

    this.getTodo = function(id){
        if(id !== null)
            return _todoList.find(todo => todo.id === id)
        else
            return _todoList[0]
    }

    this.getFirstTodo = function(){
        return _todoList.length > 0 ? _todoList[0] : null
    }

    this.addTodo = function (todo){
        _todoList.push(todo)
    }

    this.deleteTodo = function(toDelete){
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

