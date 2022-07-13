const sortButton = document.getElementById('sort-toggle')
const sortContents = document.querySelector('.sort-contents')

sortButton.addEventListener('click', () => {
  sortContents.classList.toggle('show-dropdown')
})

window.addEventListener('click', e => {
  if (e.target !== sortButton) {
    sortContents.classList.remove('show-dropdown')
  }
})
