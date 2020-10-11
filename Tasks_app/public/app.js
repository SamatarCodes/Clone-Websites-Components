// * Get all DOM references needed
const input = document.getElementById('input');
const todosContainer = document.getElementById('todos');

// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
const todosArray = [];
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

const addTodo = (userInput) => {
  const todoEl = document.createElement('todo');
  todoEl.innerHTML = `
    <div class="perTodo border-t border-gray-900 b py-2 flex justify-between items-center ">
        <div class="left-side">
        <input type="checkbox" class="mr-2 checkbox"  />
        <span class="text-gray-400 text-sm">${userInput}</span>
        </div>
        <button id="deleteBtn"><i class="far fa-trash-alt"></i></button>
</div>
`;
  // append
  todosContainer.appendChild(todoEl);

  // if checkbox is checked, add line-through
  todoEl.addEventListener('click', (e) => {
    if (e.target.checked) {
      todoEl.classList.add('addLineThrough');
    } else {
      todoEl.classList.remove('addLineThrough');
    }
    console.log(e.target);
    // check if the delete button is clicked
    if (e.target.classList.contains('fa-trash-alt')) {
      // remove the element
      todoEl.remove();
    }
  });

  // if trash bin is clicked, delete the item
  //   todoEl.addEventListener('click', (e) => {
  //     const removeTodo = e.target.parentElement.parentElement;
  //     removeTodo.remove();
  //   });
};

// * Input event listener
input.addEventListener('keydown', (e) => {
  // if user presses on Enter key
  if (e.key === 'Enter') {
    // add user input to todosArray
    // todosArray.push(e.target.value);
    // call the addTodoToDom function to display it
    //  addTodoToDom(e.target.value);
    addTodo(e.target.value);
    // clear input field
    e.target.value = '';
  }
});
