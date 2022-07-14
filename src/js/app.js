// SORT BUTTON:
const sortButton = document.getElementById('sort-toggle')
const sortIcon = document.getElementById('sort-icon')
const sortContents = document.querySelector('.sort-contents')

document.body.addEventListener('click', e => {
  if (e.target !== sortButton && e.target !== sortIcon) {
    sortContents.classList.add('show-dropdown')
  }
  sortContents.classList.toggle('show-dropdown')
})

// EDIT TWEET BUTTON:
const editTweetButtons = document.querySelectorAll('.edit-toggle')

editTweetButtons.forEach(button => {
  let dropdowncontent = button.parentElement.querySelector('.edit-dropdown')
  button.addEventListener('click', () => {
    dropdowncontent.classList.toggle('show-edit-dropdown')
    console.log(button.previousElementSibling)
  })
})

// NEW TWEET BUTTON + MODAL
const newTweetButton = document.getElementById('new-tweet-button')
const newTweetModal = document.getElementById('new-tweet-modal')
const closeModalButton = document.getElementById('close-modal')

const toggleModal = () => {
  newTweetModal.classList.toggle('hidden')
  newTweetModal.classList.toggle('flex')
}

newTweetButton.addEventListener('click', toggleModal)
closeModalButton.addEventListener('click', toggleModal)
