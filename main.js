let todos = [
    {
        id: 1, name: 'Walk Dog', completed: false, category: 0,
    },
    {
        id: 2, name: 'Do Homework', completed: false, category: 2,
    },
    {
        id: 3, name: 'Wash dishes', completed: true, category: 1,
    },
    {
        id: 4, name: 'Clean room', completed: false, category: 1,
    },
]

let categories = [
    {
        id: 0,
        categoryName: 'exercise'
    },
    {
        id: 1,
        categoryName: 'home'
    },
    {
        id: 2,
        categoryName: 'school'
    },
]


const todoInput = document.getElementById('todoInput');
const addTodoButton = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');
const clearTodosButton = document.getElementById('clearTodos');
const status = document.getElementById('status');
const todosLeft = document.getElementById('todosLeft');
const todosCompleted = document.getElementById('todosCompleted');


todos.forEach(todo => {
  addTodoToList(todo.name, todo.checked);
});

function updateTodoStatus() {
    const todoItems = todoList.querySelectorAll('li');
    const totalTodos = todoItems.length;
    let completedTodos = 0;
    todoItems.forEach(todoItem => {
      if (todoItem.classList.contains('checked')) {
        completedTodos++;
      }
    });
    const todosLeftCount = totalTodos - completedTodos;

    todosLeft.textContent = `${todosLeftCount} todos left`;
    todosCompleted.textContent = `${completedTodos} todos completed`;
  }

  clearTodosButton.addEventListener('click', function () {
    const todoItems = todoList.querySelectorAll('li');
    todoItems.forEach(todoItem => {
      todoItem.remove();
    });
    updateTodoStatus();
  });

function addTodoToList(text, checked) {
  const todoItem = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = checked;
  checkbox.addEventListener('change', function () {
    todoItem.classList.toggle('checked', checkbox.checked);
    updateTodoStatus();
  });

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.className = 'edit';
  editButton.addEventListener('click', function () {
    const newText = prompt('Edit the todo:', text);
    if (newText !== null) {
      todoText.textContent = newText;
    }
  });

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'delete';
  deleteButton.addEventListener('click', function () {
    todoItem.remove();
    updateTodoStatus();
  });

  const todoText = document.createElement('span');
  todoText.textContent = text;

  todoItem.appendChild(checkbox);
  todoItem.appendChild(todoText);
  todoItem.appendChild(editButton);
  todoItem.appendChild(deleteButton);
  todoList.appendChild(todoItem);

  if (checked) {
    todoItem.classList.add('checked');
  }
}

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText === '') {
    alert('Please enter a todo.');
    return;
  }

  addTodoToList(todoText, false);
  todoInput.value = '';
  updateTodoStatus();
}

addTodoButton.addEventListener('click', addTodo);

todoInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addTodo();
  }
});