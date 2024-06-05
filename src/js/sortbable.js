import Sortable from "sortablejs";

export function createSortable(element) {
    return new Sortable.create(element, {
        draggable: '.todo-item',
        sort: true,
        handle: '.my-handle',
        forceFallback: true,
        fallbackOnBody: true,
        group: 'order',
        dataIdAttr: 'data-id',
        store: {
            get: function (sortableList) {
                let order = localStorage.getItem(sortableList.options.group.name);
                return order ? order.split('|') : [];
            },
            set: function (sortableList) {
                let order = sortableList.toArray();
                localStorage.setItem(sortableList.options.group.name, order.join('|'));
            }
        }
    })
}
