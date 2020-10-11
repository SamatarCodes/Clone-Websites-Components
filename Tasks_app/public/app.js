// * Get all DOM references needed
const input = document.getElementById('input');
const todosContainer = document.getElementById('todos');

// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
const todosArray = [];

const addTodoToDom = (todosArray) => {
  // loop through the todosArray
  todosContainer.textContent = '';
  todosArray.forEach((todo) => {
    const eachTodo = document.createElement('eachTodo');
    // for each todo, add it to the DOM
    eachTodo.innerHTML = `
    <div class=" border-t border-gray-900 b py-2 flex justify-between items-center ">
    <div class="left-side">
        <input type="checkbox" class="mr-2" />
        <span class="text-gray-400 text-sm">${todo}</span>
    </div>
    <button id="deleteBtn"><i class="far fa-trash-alt"></i></button>
</div>
    `;
    todosContainer.appendChild(eachTodo);
  });
};

// * Input event listener
input.addEventListener('keydown', (e) => {
  // if user presses on Enter key
  if (e.key === 'Enter') {
    // add user input to todosArray
    todosArray.push(e.target.value);
    // call the addTodoToDom function to display it
    addTodoToDom(todosArray);
    // clear input field
    e.target.value = '';
  }
});
