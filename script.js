if (!localStorage.getItem('tasks')) {

    var todos = []
    var todos_storage = todos.toString()
    localStorage.setItem('tasks', todos_storage)

}

function block_form() {

    document.querySelector('#task_input').value = ''
    document.querySelector('#submit_btn').disabled = true
    document.querySelector('#submit_btn').style.cursor = 'not-allowed'

}

function save_tasks(task) {

    todos.push(task)
    todos_storage = todos.toString()
    localStorage.setItem('tasks', todos_storage)

}

function load_tasks() {

    todos = localStorage.getItem('tasks').split(',')

    todos.forEach(item => {

        if (item == '') { return false }

        const item_li = document.createElement('li')

        item_li.innerHTML = item

        document.querySelector('#task_list').appendChild(item_li)

    })

}

function reset_tasks() {

    task_list.innerHTML = []
    todos = []
    todos_storage = todos.toString()
    localStorage.setItem('tasks', todos_storage)

}



window.addEventListener('DOMContentLoaded', () => {

    const task_input = document.querySelector('#task_input')
    const submit_btn = document.querySelector('#submit_btn')
    const task_list = document.querySelector('#task_list')

    load_tasks(task_list)

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

        if (task == '' || !task.replace(/\s/g, '').length) {

            block_form()

            window.alert('Tarefas vazias não passarão! (Boa tentativa, mas este é um caso pensado).')

            return false

        }

        const li = document.createElement('li')

        li.innerHTML = task

        task_list.append(li)

        block_form()

        save_tasks(task)

        return false

    }

    document.querySelector('#clear').onsubmit = () => {

        reset_tasks()

    }

})