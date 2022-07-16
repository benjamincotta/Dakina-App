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
document.addEventListener('click', e => {
  if (e.target.classList.contains('edit-toggle')) {
    e.target.nextElementSibling.classList.toggle('flex')
    e.target.nextElementSibling.classList.toggle('hidden')
  }
})

// NEW TWEET BUTTON + MODAL
const newTweetButton = document.getElementById('new-tweet-button')
const newTweetModal = document.getElementById('new-tweet-modal')
const closeModalButton = document.getElementById('close-modal')

const toggleModal = () => {
  newTweetModal.classList.toggle('hidden')
  newTweetModal.classList.toggle('flex')
  titleError.classList.add('hidden')
  contentError.classList.add('hidden')
}

newTweetButton.addEventListener('click', toggleModal)
closeModalButton.addEventListener('click', toggleModal)

// FUNCTIONALITY:

// HIDE PROP TWEET:
const propTweet = document.querySelector('.prop-tweet')
if (tweets.length > 0) {
  propTweet.classList.remove('flex')
  propTweet.classList.add('hidden')
}

// CREATE NEW TWEET:
const form = document.getElementById('new-tweet-form')
const tweetTitleInput = document.getElementById('tweet-title-input')
const tweetContentInput = document.getElementById('tweet-content-input')
const tweetsList = document.getElementById('tweets-list')
const template = document.querySelector('#tweet-item-template')

const LOCAL_STORAGE_PREFIX = 'DAKINA'
const TWEET_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-tweet`

let tweets = loadTweets()
tweets.forEach(renderTweets)

form.addEventListener('submit', e => {
  e.preventDefault()

  const newTweetTitle = tweetTitleInput.value
  const newTweetContent = tweetContentInput.value
  const titleError = document.querySelector('.title-error')
  const contentError = document.querySelector('.content-error')

  if (newTweetTitle.length < 1 && newTweetContent.length > 0) {
    titleError.classList.remove('hidden')
    titleError.classList.add('flex')
    contentError.classList.add('hidden')
  } else if (newTweetContent.length < 1 && newTweetTitle.length > 0) {
    contentError.classList.remove('hidden')
    contentError.classList.add('flex')
    titleError.classList.add('hidden')
  } else if (newTweetTitle.length < 1 && newTweetContent.length < 1) {
    titleError.classList.remove('hidden')
    titleError.classList.add('flex')
    contentError.classList.remove('hidden')
    contentError.classList.add('flex')
  } else {
    const newTweet = {
      title: newTweetTitle,
      content: newTweetContent,
    }
    toggleModal()
    tweets.push(newTweet)
    renderTweets(newTweet)
    saveTweets()
    tweetTitleInput.value = ''
    tweetContentInput.value = ''
    titleError.classList.add('hidden')
    contentError.classList.add('hidden')
  }
})

loadTweets()
// SAVE TWEET
function saveTweets() {
  localStorage.setItem(TWEET_STORAGE_KEY, JSON.stringify(tweets))
}
// RENDER TWEETS
function renderTweets(tweet) {
  const templateClone = template.content.cloneNode(true)
  const tweetItem = document.querySelector('.tweet-item')
  const tweetTitleElement = templateClone.querySelector(
    '[data-tweet-item-title]'
  )
  tweetTitleElement.innerText = tweet.title
  const tweetContentElement = templateClone.querySelector(
    '[data-tweet-item-content]'
  )
  tweetContentElement.innerText = tweet.content
  tweetsList.appendChild(templateClone)
}

// LOAD TWEETS:
function loadTweets() {
  const tweetString = localStorage.getItem(TWEET_STORAGE_KEY)
  return JSON.parse(tweetString) || []
}

// DELETE TWEET
