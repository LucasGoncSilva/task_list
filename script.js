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
        const li = document.createElement('li')

        li.innerHTML = task

        task_list.append(li)

        task_input.value = ''
        submit_btn.disabled = true

        return false
    }

    document.querySelector('#clear').onsubmit = () => {

        task_list.innerHTML = []
    }

})