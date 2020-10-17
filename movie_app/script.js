const movieContainer = document.getElementById('movie_container');
const checkbox = document.getElementById('nav-toggle');

window.addEventListener('resize', () => {
  if (document.body.clientWidth >= 885) {
    checkbox.checked = false;
    console.log('check');
  }
});
