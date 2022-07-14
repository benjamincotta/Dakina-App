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

// FUNCTIONALITY:

// CREATE NEW TWEET:
// STORE TITLE AND CONTENT FROM FORM ON SUBMIT TO LOCAL STORAGE
const form = document.getElementById('new-tweet-form')
const tweetTitleInput = document.getElementById('tweet-title-input')
const tweetContentInput = document.getElementById('tweet-content-input')
const tweetsList = document.getElementById('tweets-list')
let tweets = []
const LOCAL_STORAGE_PREFIX = 'DAKINA'
const TITLE = `${LOCAL_STORAGE_PREFIX}-tweet-title`
const CONTENT = `${LOCAL_STORAGE_PREFIX}-tweet-content`

form.addEventListener('submit', e => {
  e.preventDefault()

  const newTweetTitle = tweetTitleInput.value
  const newTweetContent = tweetContentInput.value

  if (newTweetTitle === '') return
  const newTweet = {
    title: newTweetTitle,
    content: newTweetContent,
  }
  toggleModal()
  tweets.push(newTweet)
  // renderTweets(newTweet)
  saveTweets()
  tweetTitleInput.value = ''
  tweetContentInput.value = ''
})

// SAVE TWEET
function saveTweets() {
  localStorage.setItem(TITLE, JSON.stringify(tweets))
}
// LOAD TWEETS

// DELETE TWEET
