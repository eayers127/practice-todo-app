

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5500;

app.use(bodyParser.json());

let todos = [
  { id: 1, name: 'Walk Dog', completed: false, category: 'Exercise' },
  { id: 2, name: 'Do Homework', completed: false, category: 'School' },
  { id: 3, name: 'Wash dishes', completed: true, category: 'Home' },
  { id: 4, name: 'Clean room', completed: false, category: 'Home' },
];

let categories = ['Work', 'Home', 'Exercise', 'School'];

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/api/todos', (req, res) => {
  const newTodo = req.body;
  newTodo.id = todos.length + 1;
  todos.push(newTodo);
  res.json(newTodo);
});

// Update a todo
app.put('/api/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const updatedTodo = req.body;

  todos = todos.map(todo => (todo.id === todoId ? { ...todo, ...updatedTodo } : todo));

  res.json(updatedTodo);
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== todoId);
  res.sendStatus(204);
});

// Get all todos for a category
app.get('/api/todos/category/:category', (req, res) => {
  const category = req.params.category;
  const todosInCategory = todos.filter(todo => todo.category === category);
  res.json(todosInCategory);
});

// Get all categories
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

// Add a new category
app.post('/api/categories', (req, res) => {
  const newCategory = req.body;
  categories.push(newCategory);
  res.json(newCategory);
});

// Update a category
app.put('/api/categories/:oldCategory', (req, res) => {
  const oldCategory = req.params.oldCategory;
  const newCategory = req.body;

  categories = categories.map(category =>
    category === oldCategory ? newCategory : category
  );

  // Update category in todos as well
  todos = todos.map(todo =>
    todo.category === oldCategory ? { ...todo, category: newCategory } : todo
  );

  res.json(newCategory);
});

// Delete a category
app.delete('/api/categories/:category', (req, res) => {
  const category = req.params.category;

  categories = categories.filter(cat => cat !== category);

  // Remove category from todos
  todos = todos.filter(todo => todo.category !== category);

  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

