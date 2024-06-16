export default function Project(name){
    let _name = name
    let _id = Date.now().toString(36) + Math.random().toString(36);

    return {
        'name': _name,
        id: _id,
        todoList: []
    }
}