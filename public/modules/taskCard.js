export default class TaskCard extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow( { mode: 'open' } ); 
    }

    connectedCallback() {
        
        Promise.all( [
            fetch(`chunks/chunk01.html`)
                .then(response => response.text())
                .then(response => this.shadow.innerHTML = response),
            fetch('css/style.css')
                .then( response => response.text()),
            fetch('http://localhost:3000/tasks')
                .then(response => response.json())
                .then(response => {
                    this.data = response;
                })
        ] )
        .then(response => {
            
            this.shadow.appendChild(document.createElement('style'))
                .textContent = response[1];
            this.shadow.innerHTML = response[0];
            this.data = response[2];
            
            
            response[2].forEach(element => {
                for (let i = 0; i < response[2].length; i++) {
                    this.data = element.task
                    this.showData(element.task)
                
                this.data += element.task
            }
            })
        })
        .then(this.setHandlers.bind(this))
        .catch(error => console.log(error));
    }

    showData(data) { 
        let i;
        let texts = Array.from(this.shadow.querySelectorAll('#task-text'))
            for (i = 0; i<=this.data.length; i++) {
            }
    }

    disconnectedCallback() {

    }
    
    removeTask() {
        this.remove()
    }

    saveData() {
        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    task: this.shadow.querySelector('#task-text').value,
                    done: false
                }
            )
        })
        .catch(error => console.log(error));
    }

    getDone() {
        fetch('http://localhost:3000/tasks', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    done: true
                }
            )
        })
        .catch(error => console.log(error));
    }

    setHandlers() {
        let self = this
        
        this.shadow.querySelector('#task-remove').onclick = function(event) {
            self.removeTask()
        }

        this.shadow.querySelector('#task-text').onchange = function(event) {
            self.saveData()
            self.shadow.appendChild(document.createElement('p')).innerText = event.target.value;
            event.target.remove() 
            self.shadow.querySelector('#task-remove').hidden = false;
        }
        
        this.shadow.querySelector('#task-done').onclick = function(event) {
            self.getDone()
        }
    }

}


