let tasks = [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const task = { id: Date.now(), title: taskText, completed: false };
    tasks.push(task);
    renderTasks();
    taskInput.value = '';
  }
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });
  renderTasks();
}

function filterTasks(filter) {
  let filteredTasks = [];
  switch (filter) {
    case 'active':
      filteredTasks = tasks.filter(task => !task.completed);
      break;
    case 'completed':
      filteredTasks = tasks.filter(task => task.completed);
      break;
    default:
      filteredTasks = tasks;
      break;
  }
  renderTasks(filteredTasks);
}

function renderTasks(tasksToRender = tasks) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  tasksToRender.forEach(task => {
    const listItem = document.createElement('li');
    listItem.textContent = task.title;
    if (task.completed) {
      listItem.classList.add('completed');
    }
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.addEventListener('click', () => deleteTask(task.id));
    const toggleButton = document.createElement('button');
    toggleButton.textContent = task.completed ? '✅' : '⭕';
    toggleButton.addEventListener('click', () => toggleTask(task.id));
    listItem.appendChild(deleteButton);
    listItem.appendChild(toggleButton);
    taskList.appendChild(listItem);
  });
}