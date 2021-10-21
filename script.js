var editting = false

if (!localStorage.getItem('tasks')) {

    var todos = []
    var todos_storage = todos.toString()
    localStorage.setItem('tasks', todos_storage)

}


if (!localStorage.getItem('tag_num') || !localStorage.getItem('tag_num_storage')) {

    localStorage.setItem('tag_num', 0)

    var tag_list = []

}


function update_tag(num) {

    localStorage.setItem('tag_num', num)
    tag = Number(localStorage.getItem('tag_num'))

}

function check_editting(form, todos) {

    if (editting === false) { toggle_form(form); return false }

    if (todos.length <= 1) {

        window.alert('Nenhuma tarefa a ser editada')
        editting = false
        return false

    }

    toggle_form(form)

    console.log('true')

}

function toggle_form(form) {

    const popup = document.querySelector(`#${form}_task_popup`)

    switch (popup.style.display === 'block') {
        case false:
            popup.style.display = 'block'
            break;

        case true:
            popup.style.display = 'none'
            break;
    }

}

function block_form() {

    document.querySelector('#add_task_input').value = ''
    document.querySelector('#add_task_button').disabled = true
    document.querySelector('#add_task_button').style.cursor = 'not-allowed'

}

function save_tasks(task, data) {

    data++

    todos.push(task)
    todos_storage = todos.toString()
    localStorage.setItem('tasks', todos_storage)

    update_tag(data)

}

function load_tasks() {

    todos = localStorage.getItem('tasks').split(',')
    todos_forof = todos.values()

    tag = todos.length

    for (const item of todos_forof && todos) {

        switch (item) {
            case '':
                break;

            default:
                const item_li = document.createElement('li')

                item_li.innerHTML = item
                item_li.setAttribute('data-tag', todos.indexOf(item))

                document.querySelector('#task_list').appendChild(item_li)
                break;
        }

    }

}

function reset_tasks() {

    let confirm = window.confirm('Tem certeza? Toda a lista será apagada.')

    if (confirm) {

        task_list.innerHTML = []
        todos = []
        todos_storage = todos.toString()
        localStorage.setItem('tasks', todos_storage)

        tag_list = []

        window.location.reload()

    }

    return false

}



window.addEventListener('DOMContentLoaded', () => {

    const add_task_input = document.querySelector('#add_task_input')
    const add_task_button = document.querySelector('#add_task_button')
    const task_list = document.querySelector('#task_list')

    load_tasks()

    block_form()

    add_task_input.onkeyup = () => {

        add_task_button.disabled = false
        add_task_button.style.cursor = 'pointer'

        if (add_task_input.value.length !== 0) {

            add_task_button.disabled = false
            add_task_button.style.cursor = 'pointer'

        } else { block_form() }

    }

    document.querySelector('#add_task').onsubmit = () => {

        const task = add_task_input.value

        if (task == '' || !task.replace(/\s/g, '').length) {

            block_form()

            window.alert('Tarefas vazias não passarão! (Boa tentativa, mas este é um caso pensado).')

            return false

        }

        const li = document.createElement('li')
        li.innerHTML = task
        li.setAttribute('data-tag', tag)
        task_list.append(li)

        block_form()

        save_tasks(task, tag++)

        return false

    }

    document.querySelectorAll('.toggle_form').forEach((button) => {

        button.onclick = () => {

            const form = button.dataset.form

            switch (form) {
                case 'edit':
                    editting = !editting
                    check_editting(form, todos)
                    break;

                default:
                    toggle_form(form)
                    break;
            }

        }

    })

    document.querySelector('#clear').onclick = reset_tasks

})