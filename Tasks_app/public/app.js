// * Get all DOM references needed
const input = document.getElementById('input');
const todosContainer = document.getElementById('todos');
const taskCounterEl = document.getElementById('taskNumber');

let taskCounter = 0;

// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

const addTodo = (userInput) => {
  const todoEl = document.createElement('todo');

  todoEl.innerHTML = `
    <div class="perTodo opacity-100 animate-pulse border-t border-gray-900 b py-2 flex justify-between items-center  ">
        <div class="left-side">
        <label><input type="checkbox" class="mr-2 checkbox"  /></label>
        <span class="text-gray-400 text-sm ">${userInput}</span>
        </div>
        <button id="deleteBtn" class=""><i class="far fa-trash-alt"></i></button>
    </div>
`;
  // append
  todosContainer.appendChild(todoEl);
  taskCounter++;
  taskCounterEl.textContent = taskCounter;

  // * add event listener to todoEl
  todoEl.addEventListener('click', (e) => {
    const spans = todoEl.querySelectorAll('span');
    const checkboxes = todoEl.querySelectorAll('.checkbox');

    // loop through the checkbox and see if its checked
    checkboxes.forEach((checkbox) => {
      // if element clicked is a checkbox and its checked then...
      if (e.target === checkbox && checkbox.checked) {
        todoEl.classList.add('addLineThrough');
        taskCounter--;
        taskCounterEl.textContent = taskCounter;
        /// if element clicked is a checkbox and its NOT checked then...
      } else if (e.target === checkbox && !checkbox.checked) {
        taskCounter++;
        taskCounterEl.textContent = taskCounter;
        todoEl.classList.remove('addLineThrough');
      }

      // * Delete button
      if (e.target.classList.contains('fa-trash-alt')) {
        todoEl.classList.toggle('animate-disappear');
        todoEl.remove();

        if (!checkbox.checked) {
          taskCounter--;
          taskCounterEl.textContent = taskCounter;
        }
      }
    });
  });
};

// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// * Input event listener
input.addEventListener('keydown', (e) => {
  // if user presses on Enter key
  if (e.key === 'Enter' && e.target.value !== '') {
    addTodo(e.target.value);
    // clear input field
    e.target.value = '';
  }
});
