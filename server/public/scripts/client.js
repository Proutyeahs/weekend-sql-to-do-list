$(document).ready(ready);

function ready() {
    loadTasks()
    $('#addTask').on('click', addTask)
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

    for (let task of tasks) {
        $('#tasks').append(`
            <tr data-id={tasks[i].id}>
                <td><button id="complete">Done</button></td>
                <td>${task.task}</td>
                <td>${task.notes}</td>
                <td><button id="deleteBtn">Delete</button></td>
            </tr>
        `);
    }
}