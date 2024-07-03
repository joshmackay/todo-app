export function Todo(title, id = 0, projectId, dueDate, priority, description = "") {
    let _title = title
    let _id = id === 0 ? Date.now().toString(36) + Math.random().toString(36) : id
    let _projectId = projectId
    let _dueDate = dueDate
    let _priority = priority
    let _description = description

    this.toJSON = function(){
        return{
            title: _title,
            id: _id,
            description: _description,
            priority: _priority,
            dueDate: _dueDate,
            projectId: _projectId
        }
    }

    Object.defineProperties(this, {
        'title': {
            get: function () {
                return _title
            },
            set: function (newTitle) {
                _title = newTitle
            }
        },
        'id': {
            get: function () {
                return _id
            },
        },
        'description': {
            get: function () {
                return _description
            },
            set: function (newDescription) {
                _description = newDescription
            }
        },
        'priority': {
            get: function () {
                return _priority
            },
            set: function (newPriority) {
                _priority = newPriority
            }
        },
        'dueDate': {
            get: function () {
                return _dueDate
            },
            set: function (newDueDate) {
                _dueDate = newDueDate
            }
        },
        'projectId': {
            get: function () {
                return _projectId
            },
        },
    })
}

