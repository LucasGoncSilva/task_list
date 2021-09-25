if (!localStorage.getItem('tasks')) {
    var todos = []
    var todos_storage = todos.toString()
    localStorage.setItem('tasks', todos_storage)
}

console.log(todos_storage)

function save_added_task(task) {
    todos.append(task)
    var todos_storage = todos.toString()
    localStorage.setItem('tasks', todos_storage)
}

window.addEventListener('DOMContentLoaded', () => {

    const submit_btn = document.querySelector('#submit_input')
    const task_input = document.querySelector('#task_input')
    const task_list = document.querySelector('#task_list')

    submit_btn.disabled = true
    submit_btn.style.cursor = 'not-allowed'

    task_input.onkeyup = () => {

        submit_btn.disabled = false
        submit_btn.style.cursor = 'pointer'

        if (task_input.value.length !== 0) {
            submit_btn.disabled = false
            submit_btn.style.cursor = 'pointer'
        } else { submit_btn.disabled = true; submit_btn.style.cursor = 'not-allowed' }
    }

    document.querySelector('#add').onsubmit = () => {

        const task = task_input.value

        if (task === '') {
            task_input.value = ''
            submit_btn.disabled = true
            submit_btn.style.cursor = 'not-allowed'

            return false
        }

        const li = document.createElement('li')

        li.innerHTML = task

        task_list.append(li)

        task_input.value = ''
        submit_btn.disabled = true
        submit_btn.style.cursor = 'not-allowed'

        return false
    }

    document.querySelector('#clear').onsubmit = () => {

        task_list.innerHTML = []
        todos = []
        
        localStorage.setItem('tasks', 
    }

})
