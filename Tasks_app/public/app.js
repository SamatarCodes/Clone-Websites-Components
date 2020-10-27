// * Get all DOM references needed
const input = document.getElementById('input');
const todosContainer = document.getElementById('todos');
const taskNumberEl = document.getElementById('taskNumber');

let taskNumber = 0;

// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

const addTodo = (userInput) => {
  const todoEl = document.createElement('todo');

  todoEl.innerHTML = `
    <div class="perTodo opacity-100 animate-pulse border-t border-gray-900 b py-2 flex justify-between items-center transition-opacity ease-in duration-700 ">
        <div class="left-side">
        <label><input type="checkbox" class="mr-2 checkbox"  /></label>
        <span class="text-gray-400 text-sm ">${userInput}</span>
        </div>
        <button id="deleteBtn" class=""><i class="far fa-trash-alt"></i></button>
    </div>
`;
  // append
  todosContainer.appendChild(todoEl);
  taskNumber++;
  taskNumberEl.textContent = taskNumber;

  // * add event listener to todoEl
  todoEl.addEventListener('click', (e) => {
    const spans = todoEl.querySelectorAll('span');
    const checkboxes = todoEl.querySelectorAll('.checkbox');

    // loop through the checkbox and see if its checked
    checkboxes.forEach((checkbox) => {
      // if element clicked is a checkbox and its checked then...
      if (e.target === checkbox && checkbox.checked) {
        todoEl.classList.add('addLineThrough');
        taskNumber--;
        taskNumberEl.textContent = taskNumber;
        /// if element clicked is a checkbox and its NOT checked then...
      } else if (e.target === checkbox && !checkbox.checked) {
        taskNumber++;
        taskNumberEl.textContent = taskNumber;
        todoEl.classList.remove('addLineThrough');
      }

      // * Delete button
      if (e.target.classList.contains('fa-trash-alt')) {
        console.log('click');
        todoEl.remove();
        if (!checkbox.checked) {
          taskNumber--;
          taskNumberEl.textContent = taskNumber;
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
