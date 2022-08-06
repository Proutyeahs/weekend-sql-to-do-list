$(document).ready(ready);

function ready() {
    loadTasks()
    $('#addTask').on('click', addTask)
    $('#tasks').on('click', '#deleteBtn', handleDelete)
    $('#tasks').on('click', '#complete', complete)
}

function complete() {
    const id = $(this).closest('tr').data('id');
    console.log(id)
    $.ajax({
        method: 'PUT',
        url: `/todo/${id}`,
        data: {
            complete: true
        }
    }).then(function (response) {
        loadTasks()
    }).catch(function(err) {
        console.log(err)
        alert('error in put')
    })
}

function handleDelete() {
    const id = $(this).closest('tr').data('id');
    console.log(id)
    $.ajax({
        method: 'DELETE',
        url: `/todo/${id}`
    }).then(function(response) {
        loadTasks(response)
    }).catch(function(err) {
        console.log(err)
        alert('error in delete')
    })
}

function addTask() {
    let task = {};
    task.item = $('#task').val(),
    task.note = $('#notes').val(),
    task.complete = false
    postTodo(task)
}

function postTodo(taskToAdd) {
    $.ajax({
        type: 'POST',
        url: '/todo',
        data: taskToAdd
    }).then(function(response) {
        console.log('in post')
        loadTasks(response)
    }).catch(function(err) {
        console.log(err)
        alert('Issue in post')
    })
}

function loadTasks() {
    $.ajax({
        type: 'GET',
        url: '/todo',
    }).then(function(response) {
        console.log('in get')
        taskToDOM(response)
    }).catch(function(err) {
        console.log(err)
        alert('Issue in get')
    })
}

function taskToDOM(tasks) {
    console.log('in append to dom')
    $('#tasks').empty();
    $('#task').val('')
    $('#notes').val('')
    for (let task of tasks) {
        if (task.complete === false) {
            $('#tasks').append(`
                <tr class="incomplete" data-id=${task.id}>
                    <td><button id="complete">Done!</button></td>
                    <td>${task.task}</td>
                    <td>${task.notes}</td>
                    <td><button id="deleteBtn">Delete</button></td>
                </tr>
            `);
        } else {
            $('#tasks').append(`
                <tr class="complete" data-id=${task.id}>
                    <td>✓</td>
                    <td>${task.task}</td>
                    <td>${task.notes}</td>
                    <td><button id="deleteBtn">Delete</button></td>
                </tr>
            `);
        }
        
    }
}