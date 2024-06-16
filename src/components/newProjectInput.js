
export function ProjectInput(){
    const newListItem = document.createElement('li');
    const projectItemText = document.createElement("input");

    newListItem.classList.add(
        'new-project-input',
        'w-full',
        'h-[40px]',
        //'hover:bg-[rgb(255,255,255,0.06)]',
        'items-center',
        'rounded-[8px]',
        'relative',
        'will-change-transform',
        'mb-4'
    );

    projectItemText.classList.add(
        'w-full',
        'text-lg',
        'border-none',
        'rounded-[8px]',
        'text-slate-100',
        'font-thin',
        'bg-[rgba(255,255,255,0.03)]',
        'focus:bg-[rgb(30,30,30)]'
)

    newListItem.appendChild(projectItemText)

    newListItem.addEventListener('keypress', (e) => {

    })

    return newListItem;
}