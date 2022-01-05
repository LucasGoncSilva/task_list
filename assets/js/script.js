let editting = false

if (!localStorage.getItem('tasks')) {

    let todos = []
    let todos_storage = todos.toString()
    localStorage.setItem('tasks', todos_storage)

}


if (!localStorage.getItem('tag_num') || !localStorage.getItem('tag_num_storage')) {

    localStorage.setItem('tag_num', 0)

    var tag_list = []

}


function updateTag(num) {

    localStorage.setItem('tag_num', num)
    tag = Number(localStorage.getItem('tag_num'))

}

function checkEditting(form, todos) {

    if (editting === false) {
        toggleForm(form)

        document.querySelectorAll('li').forEach((li) => {
            li.onmouseover = () => { li.style.cursor = 'unset' }
        })

        return false
    }

    if (todos.length <= 1) {

        Swal.fire({
            icon: 'info',
            iconColor: '#4717f6',
            title: 'Lista Vazia',
            html: '<p>Não há tarefa nenhuma na lista para ser editada</p>'
        })

        editting = false
        return false

    }

    toggleForm(form)

    document.querySelectorAll('li').forEach((li) => {
        li.onmouseover = () => { li.style.cursor = 'pointer' }
    })

}

function toggleForm(form) {

    const popup = document.getElementById(`${form}_task_popup`)

    document.querySelectorAll(`.toggle_popup:not(#${form}_task_popup)`).forEach(form => {
        form.style.display = 'none'
    })

    switch (popup.style.display === 'block') {
        case false:
            popup.style.display = 'block'
            break;

        case true:
            popup.style.display = 'none'
            break;
    }

}

function blockForm(form) {

    if (form === 'edit') {
        document.getElementById(`${form}_task_input`).disabled = true
        document.getElementById(`${form}_task_input`).style.cursor = 'not-allowed'
    }

    document.getElementById(`${form}_task_input`).value = ''
    document.getElementById(`${form}_task_button`).disabled = true
    document.getElementById(`${form}_task_button`).style.cursor = 'not-allowed'

}

function saveTasks(task, data) {

    data++

    todos.push(task)
    todos_storage = todos.toString()
    localStorage.setItem('tasks', todos_storage)

    updateTag(data)

}

function loadTasks() {

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

function resetTasks() {

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

    const add_task_input = document.getElementById('add_task_input')
    const add_task_button = document.getElementById('add_task_button')
    const edit_task_input = document.getElementById('edit_task_input')
    const edit_task_button = document.getElementById('edit_task_button')
    const task_list = document.getElementById('task_list')

    loadTasks()

    blockForm('edit')
    blockForm('add')

    edit_task_input.onkeyup = () => {

        edit_task_button.disabled = false
        edit_task_button.style.cursor = 'pointer'

        if (edit_task_input.value.length !== 0) {

            edit_task_button.disabled = false
            edit_task_button.style.cursor = 'pointer'

        } else { blockForm('edit') }

    }

    add_task_input.onkeyup = () => {

        add_task_button.disabled = false
        add_task_button.style.cursor = 'pointer'

        if (add_task_input.value.length !== 0) {

            add_task_button.disabled = false
            add_task_button.style.cursor = 'pointer'

        } else { blockForm('add') }

    }

    document.getElementById('add_task').onsubmit = () => {

        const task = add_task_input.value

        if (task == '' || !task.replace(/\s/g, '').length) {

            blockForm('add')

            window.alert('Tarefas vazias não passarão! (Boa tentativa, mas este é um caso pensado).')

            return false

        }

        const li = document.createElement('li')
        li.innerHTML = task
        li.setAttribute('id', `li_${tag}`)
        task_list.append(li)

        blockForm('add')

        saveTasks(task, tag++)

        return false

    }

    document.querySelectorAll('.toggle_form').forEach((button) => {

        button.onclick = () => {

            const form = button.dataset.form

            switch (form) {
                case 'edit':

                    editting = !editting
                    checkEditting(form, todos)

                    document.querySelectorAll('li').forEach((li) => {

                        li.onclick = () => {

                            const li_id = li.id
                            let text = li.innerText

                            edit_task_input.value = text

                            edit_task_button.disabled = false
                            edit_task_button.style.cursor = 'pointer'

                            edit_task_input.disabled = false
                            edit_task_input.style.cursor = 'unset'

                            if (edit_task_input.value.length !== 0) {

                                edit_task_button.disabled = false
                                edit_task_button.style.cursor = 'pointer'

                            } else { blockForm('edit') }

                            document.querySelector('#edit_task').onsubmit = () => {

                                const task = edit_task_input.value

                                if (task == '' || !task.replace(/\s/g, '').length) {

                                    blockForm('edit')

                                    window.alert('Tarefas vazias não passarão! (Boa tentativa, mas este é um caso pensado).')

                                    return false

                                }

                                document.querySelectorAll('input[name="choice"]').forEach((elem) => {

                                    if (elem.checked) {

                                        switch (elem.id) {
                                            case 'del':
                                                document.querySelector(`#${li_id}`).remove()

                                                edit_task_input.value = ''

                                                blockForm('edit')

                                                todos.splice(todos.indexOf(text), 1)
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
                    toggleForm(form)
                    break;
            }

        }

    })

    document.querySelector('#clear').onclick = resetTasks

})