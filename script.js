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

    if (editting === false) {
        toggle_form(form)

        document.querySelectorAll('li').forEach((li) => {
            li.onmouseover = () => { li.style.cursor = 'unset' }
        })

        return false
    }

    if (todos.length <= 1) {

        window.alert('Nenhuma tarefa a ser editada')
        editting = false
        return false

    }

    toggle_form(form)

    document.querySelectorAll('li').forEach((li) => {
        li.onmouseover = () => { li.style.cursor = 'pointer' }
    })

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

function block_form(form) {

    if (form === 'edit') {
        document.querySelector(`#${form}_task_input`).disabled = true
        document.querySelector(`#${form}_task_input`).style.cursor = 'not-allowed'
    }

    document.querySelector(`#${form}_task_input`).value = ''
    document.querySelector(`#${form}_task_button`).disabled = true
    document.querySelector(`#${form}_task_button`).style.cursor = 'not-allowed'

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
                item_li.setAttribute('id', `li_${todos.indexOf(item)}`)

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
    const edit_task_input = document.querySelector('#edit_task_input')
    const edit_task_button = document.querySelector('#edit_task_button')
    const task_list = document.querySelector('#task_list')

    load_tasks()

    block_form('edit')
    block_form('add')

    edit_task_input.onkeyup = () => {

        edit_task_button.disabled = false
        edit_task_button.style.cursor = 'pointer'

        if (edit_task_input.value.length !== 0) {

            edit_task_button.disabled = false
            edit_task_button.style.cursor = 'pointer'

        } else { block_form('edit') }

    }

    add_task_input.onkeyup = () => {

        add_task_button.disabled = false
        add_task_button.style.cursor = 'pointer'

        if (add_task_input.value.length !== 0) {

            add_task_button.disabled = false
            add_task_button.style.cursor = 'pointer'

        } else { block_form('add') }

    }

    document.querySelectorAll('form').forEach((form) => {

        form.onsubmit = () => {

            switch (form.id) {
                case 'add_task':

                    const task = add_task_input.value

                    if (task == '' || !task.replace(/\s/g, '').length) {

                        block_form('add')

                        window.alert('Tarefas vazias não passarão! (Boa tentativa, mas este é um caso pensado).')

                        return false

                    }

                    const li = document.createElement('li')
                    li.innerHTML = task
                    li.setAttribute('id', `li_${tag}`)
                    task_list.append(li)

                    block_form('add')

                    save_tasks(task, tag++)

                    return false

                default:
                    console.log('aoba')
                    break;
            }

        }

    })

    document.querySelectorAll('.toggle_form').forEach((button) => {

        button.onclick = () => {

            const form = button.dataset.form

            switch (form) {
                case 'edit':

                    editting = !editting
                    check_editting(form, todos)

                    document.querySelectorAll('li').forEach((li) => {

                        li.onclick = () => {

                            const li_id = li.id
                            let text = li.innerText

                            edit_task_input.value = text

                            console.log(li_id, text)

                            edit_task_button.disabled = false
                            edit_task_button.style.cursor = 'pointer'

                            edit_task_input.disabled = false
                            edit_task_input.style.cursor = 'unset'

                            if (edit_task_input.value.length !== 0) {

                                edit_task_button.disabled = false
                                edit_task_button.style.cursor = 'pointer'

                            } else { block_form('edit') }

                            document.querySelector('#edit_task').onsubmit = () => {

                                const task = edit_task_input.value

                                if (task == '' || !task.replace(/\s/g, '').length) {

                                    block_form('edit')

                                    window.alert('Tarefas vazias não passarão! (Boa tentativa, mas este é um caso pensado).')

                                    return false

                                }

                                document.querySelectorAll('input[name="choice"]').forEach((elem) => {

                                    if (elem.checked) {

                                        switch (elem.id) {
                                            case 'del':
                                                document.querySelector(`#${li_id}`).remove()

                                                todos.pop(text)
                                                todos_storage = todos.toString()
                                                localStorage.setItem('tasks', todos_storage)

                                                return false

                                            case 'edit':
                                                document.querySelector(`#${li_id}`).innerText = task
                                                todos[todos.indexOf(text)] = task
                                                todos_storage = todos.toString()
                                                localStorage.setItem('tasks', todos_storage)

                                                return false
                                        }

                                    }

                                })

                                return false

                            }

                        }

                    })

                    break;

                default:
                    toggle_form(form)
                    break;
            }

        }

    })

    document.querySelector('#clear').onclick = reset_tasks

})