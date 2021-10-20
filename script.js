if (!localStorage.getItem('tasks')) {

    var todos = []
    var todos_storage = todos.toString()
    localStorage.setItem('tasks', todos_storage)

}


if (!localStorage.getItem('tag_num')) {

    localStorage.setItem('tag_num', 0)

}


function update_tag(num) {

    localStorage.setItem('tag_num', num)
    tag = Number(localStorage.getItem('tag_num'))

    console.log(tag)

}

function block_form() {

    document.querySelector('#add_task_input').value = ''
    document.querySelector('#add_task_button').disabled = true
    document.querySelector('#add_task_button').style.cursor = 'not-allowed'

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

    let confirm = window.confirm('Tem certeza? Toda a lista será apagada.')

    if (confirm) {

        task_list.innerHTML = []
        todos = []
        todos_storage = todos.toString()

        localStorage.setItem('tasks', todos_storage)

        // update_tag(0)

        // console.log('updated')

    }

    return false

}



window.addEventListener('DOMContentLoaded', () => {

    var tag = Number(localStorage.getItem('tag_num'))
    tag++

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

        save_tasks(task)

        update_tag(tag++)

        console.log(li)

        return false

    }

    document.querySelector('#toggle_add_form').onclick = () => {

        const popup = document.querySelector('#add_task_popup')

        switch (popup.style.display === 'block') {
            case false:
                popup.style.display = 'block'
                break;

            case true:
                popup.style.display = 'none'
                break;
        }

    }

    document.querySelector('#clear').onclick = reset_tasks

})