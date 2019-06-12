import  TaskCard  from '/modules/taskCard.js';
customElements.define( 'task-card', TaskCard )

let addNew = document.getElementById('add-new')
addNew.onclick = function(event) {
    let newTask = new CustomEvent("newTask", {
        detail: {
            detail: "" 
        }
    });
    event.target.dispatchEvent(newTask);
    document.body.appendChild(document.createElement('task-card'))
}

function loadData() {
    fetch('http://localhost:3000/tasks')
    .then(response => response.json())
    .then(response => response.forEach(item => {
            let card = document.body.appendChild(document.createElement('task-card'));

    }))
    .catch(error => console.log(error));
}

window.onload = function(event) {
    loadData()
}