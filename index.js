// find the element
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#todoInput");
const todoLists = document.querySelector("#lists");
const messageElement = document.querySelector("#message");

// show message
const showMessage = (text, status) => {
  messageElement.textContent = text;
  messageElement.classList.add(`bg-${status}`);

  setTimeout(() => {
    messageElement.classList.remove(`bg-${status}`);
    messageElement.textContent = "";
  }, 1000);
};

// create todo
const createTodo = (todoId, todoValue) => {
  const todoElement = document.createElement("li");
  todoElement.id = todoId;
  todoElement.classList.add("li-style");

  todoElement.innerHTML = `
    <span>${todoValue}</span>
    <span><button class="btn" id="deleteButton"><i class="fa fa-trash"></i></button></span>
  `;
  todoLists.appendChild(todoElement);

  const deleteButton = todoElement.querySelector("#deleteButton");
  deleteButton.addEventListener("click", deleteTodo);
};

//deletetodo
const deleteTodo = (event) => {
  const selectedTodo = event.target.parentElement.parentElement.parentElement;

  todoLists.removeChild(selectedTodo);
  showMessage("todo is deleted", "danger");

  let todos = getTodosFromLocalStorage();
  todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
  localStorage.setItem("mytodos", JSON.stringify(todos));
};

// getTodosFromLocalStorage
const getTodosFromLocalStorage = () => {
  return localStorage.getItem("mytodos")
    ? JSON.parse(localStorage.getItem("mytodos"))
    : [];
};

//add todo
const addTodo = (event) => {
  event.preventDefault();
  const todoValue = todoInput.value;

  const todoId = Date.now().toString();
  createTodo(todoId, todoValue);
  showMessage("todo is added", "success");

  // add todo local storage
  const todos = getTodosFromLocalStorage();
  todos.push({ todoId, todoValue });
  localStorage.setItem("mytodos", JSON.stringify(todos));

  todoInput.value = "";
};

// loadTodos
const loadTodos = () => {
  const todos = getTodosFromLocalStorage();
  todos.map((todo) => createTodo(todo.todoId, todo.todoValue));
};

//adding Listeners
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);
