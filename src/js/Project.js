export default function Project(name, id = null){
    let _name = name
    let _id = id !== null ? id : Date.now().toString(36) + Math.random().toString(36);

    return {
        name: _name,
        id: _id,
        todoList: []
    }
}