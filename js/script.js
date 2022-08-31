(function() {
  const titleTodoInput = document.querySelector('#title-input');
  const todoForm = document.querySelector('#todo-form');
  const todoListTable = document.querySelector('#todos tbody');

  const TODO_KEY = 'todos';

  todoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (titleTodoInput.value === '') {
      alert('Please fill in the input todo first!');
      return;
    }

    if (addNewTodo(titleTodoInput.value)) {
      renderTodoList();
      titleTodoInput.value = '';
    }
  });

  function getTodos() {
    const todosRaw = localStorage.getItem(TODO_KEY);

    if (!todosRaw) {
      return null;
    }

    const todos = JSON.parse(todosRaw);
    return todos;
  }

  function setTodos(todos) {
    if (typeof todos !== 'object') {
      alert('The parameter of setTodos function is not an object');
      return false;
    }

    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
    return true;
  }

  function generateTodoObject(title) {
    return {
      title: title,
    };
  }

  function addNewTodo(title) {
    const todos = getTodos();

    if (typeof todos !== 'object') {
      alert('Cannot add new todo');
      return false;
    }

    todos.unshift(generateTodoObject(title));

    const isUpdateTodoSuccess = setTodos(todos);

    return isUpdateTodoSuccess;
  }

  function removeTodo(title) {
    const todos = getTodos();

    const filteredTodos = todos.filter((todo) => todo.title !== title);
    setTodos(filteredTodos);
    renderTodoList();
  }

  function templateTodo(todo) {
    if (typeof todos !== 'object') {
      alert('The parameter of setTodos function is not an object');
      return false;
    }

    // table row
    const trElement = document.createElement('tr');

    // table data untuk nama todo
    const titleTdElement = document.createElement('td');
    titleTdElement.innerText = todo.title;
    
    // table data untuk meletakkan tombol aksi
    const actionTdElement = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Hapus';
    removeButton.setAttribute('data-todo-title', todo.title);
    removeButton.classList.add('btn');
    removeButton.addEventListener('click', (event) => {
      removeTodo(event.target.dataset.todoTitle);
    });
    actionTdElement.appendChild(removeButton);

    trElement.append(titleTdElement, actionTdElement);

    return trElement;
  }

  function renderTodoList() {
    const todos = getTodos();

    todoListTable.innerHTML = '';

    if (!todos || todos.length === 0) {
      localStorage.setItem(TODO_KEY, JSON.stringify([]));
      todoListTable.innerHTML = `<td colspan="2">Data kosong</td>`;
    } else {
      for (const todo of todos) {
        todoListTable.appendChild(templateTodo(todo));
      }
    }
  }

  function init() {
    renderTodoList();
  }

  init();
})();
