//this is for the api assignment
const express = require('express')
const app = express()
const port = 5500

const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(express.static('frontend'));
app.use(express.json());

let todos = [
    {
        id: 1, name: 'Walk Dog', completed: false, category: 'Exercise',
    },
    {
        id: 2, name: 'Do Homework', completed: false, category: 'School',
    },
    {
        id: 3, name: 'Wash dishes', completed: true, category: 'Home',
    },
    {
        id: 4, name: 'Clean room', completed: false, category: 'Home',
    },
]


let categories = [
    // {
    //     id: 0,
    //     categoryName: 'exercise'
    // },
    // {
    //     id: 1,
    //     categoryName: 'home'
    // },
    // {
    //     id: 2,
    //     categoryName: 'school'
    // },
    'Work', 'Home', 'Exercise', 'School'
]

app.get('/api/todos', (req, res) => {
    res.json(todos)
})

app.post('/api/todo', (req, res) => {
    console.log(req)
    // get new todo 
    todos.push(
        {
            id: todos.legnth + 1,
            name: '',
            completed: false
        }
    )

    res.send(todos)
})

//complete todo
app.post('/api/complete', (req, res) => {
    const todoId = req.body.todoId
})

app.listen(port, () => {
    console.log(`Example is listening on port ${port}`)
})

fetch('/api/todos')
    .then(res => res.json())
    .then(data => console.log(data))
