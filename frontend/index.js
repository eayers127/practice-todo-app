let todos = [
    // {
    //     id: 1, name: 'Walk Dog', completed: false, category: 'Exercise',
    // },
    // {
    //     id: 2, name: 'Do Homework', completed: false, category: 'School',
    // },
    // {
    //     id: 3, name: 'Wash dishes', completed: true, category: 'Home',
    // },
    // {
    //     id: 4, name: 'Clean room', completed: false, category: 'Home',
    // },
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
    // 'Work', 'Home', 'Exercise', 'School'
]

async function getData() {
 let todosPromise = fetch('/api/todos')
  // .then((res) => res.json())
  // .then((data) => {renderTodos(data)})

  let categoriesPromise = fetch('/api/categories')

  Promise.all([todosPromise, categoriesPromise])
  .then((respsArr) => {
    return Promise.all(
      respsArr.map(res =>  res.json)
    )
  })
  .then(([todos, categories]) => {
    console.log('todos', todos)
    console.log('categories', categories)
  })

}

getData();


const todoInput = document.getElementById('todoInput');
const addTodoButton = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');
const clearTodosButton = document.getElementById('clearTodos');
const status = document.getElementById('status');
const todosLeft = document.getElementById('todosLeft');
const todosCompleted = document.getElementById('todosCompleted');
const clearCategoriesButton = document.getElementById('clearCategories');
const categoryList = document.getElementById('categoryList');
const categoryNameInput = document.getElementById('categoryName');
const categoryInput = document.getElementById('categoryInput');
// const option = document.getElementById('categoryOption');
const addCategoryButton = document.getElementById('addCategory')



todos.forEach(todo => {
  addTodoToList(todo.name, todo.checked, todo.category);
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

function addTodoToList(text, checked, category) {
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

  const todoCategory = document.createElement('span');
  todoCategory.textContent = `Category: ${category}`


  todoItem.appendChild(checkbox);
  todoItem.appendChild(todoText);
  todoItem.appendChild(editButton);
  todoItem.appendChild(deleteButton);
  todoItem.appendChild(todoCategory)
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

  fetch('/api/todo', {
    method: "POST",
    body: JSON.stringify({
      todo: todoText
    }),
    headers: {'Content-Type': 'application/json'}
  })
  .then(res => res.json())
  .then(data => {console.log(data)})
}

addTodoButton.addEventListener('click', addTodo);

todoInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addTodo();
  }
});

// categories.forEach(category => {
//     const option = document.createElement('option');
//     option.value = category;
//     option.textContent = category;
//     categoryInput.appendChild(option);
//   });


  function addCategory(categoryName) {
    if (!categories.includes(categoryName)) {
      categories.push(categoryName);
    //   const option = document.createElement('option');
    //   option.value = categoryName;
    //   option.textContent = categoryName;
    //   categoryInput.appendChild(option);
         categoryNameInput.value = '';
         updateCategoriesList();
    } else {
        alert('That category already exists');
    }
  }

  function deleteCategory(categoryName) {
    const categoryIndex = categories.indexOf(categoryName);
    if (categoryIndex !== -1) {
      categories.splice(categoryIndex, 1);
    //   const categoryOption = categoryInput.querySelector(`option[value="${categoryName}"]`);
    //   if (categoryOption) {
    //     categoryOption.remove();
    //   }
      updateCategoriesList();
    }
  }

  
  function editCategory(oldCategoryName, newCategoryName) {
    const categoryIndex = categories.indexOf(oldCategoryName);
    if (categoryIndex !== -1) {
      categories[categoryIndex] = newCategoryName;
      updateCategoriesList();
    }
  }

  
  function updateCategoriesList() {
    categoryList.innerHTML = '';
    categories.forEach(category => {
      const categoryItem = document.createElement('li');
      categoryItem.textContent = category.toUpperCase();
      const editCategoryButton = document.createElement('button');
      editCategoryButton.textContent = 'Edit';
      editCategoryButton.className = 'edit';
      editCategoryButton.addEventListener('click', () => {
        const newCategoryName = prompt('Edit the category name:', category);
        if (newCategoryName !== null) {
          editCategory(category, newCategoryName);
        }
      });
      const deleteCategoryButton = document.createElement('button');
      deleteCategoryButton.textContent = 'Delete';
      deleteCategoryButton.className = 'delete';
      deleteCategoryButton.addEventListener('click', () => {
        deleteCategory(category);
      });
      categoryItem.appendChild(editCategoryButton);
      categoryItem.appendChild(deleteCategoryButton);
      categoryList.appendChild(categoryItem);
    });
  }

  updateCategoriesList();

  addCategoryButton.addEventListener('click', function () {
    const categoryName = categoryNameInput.value.trim();
    if (categoryName === '') {
      alert('Please enter a category name.');
      return;
    }
    addCategory(categoryName);
  });

  clearCategoriesButton.addEventListener('click', function () {
    categories.length = 0;
    // categoryInput.innerHTML = '<option value="">Select a Category</option>';
    updateCategoriesList();
  });

