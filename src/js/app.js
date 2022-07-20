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
function showEditMenu(elem) {
  elem.parentElement.nextElementSibling.classList.toggle('hidden')
  elem.parentElement.nextElementSibling.classList.toggle('flex')
  document.addEventListener('click', e => {
    if (!e.target.classList.contains('elips')) {
      elem.parentElement.nextElementSibling.classList.add('hidden')
      elem.parentElement.nextElementSibling.classList.remove('flex')
    }
  })
}

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
const form = document.getElementById('new-tweet-form')
const tweetTitleInput = document.getElementById('tweet-title-input')
const tweetContentInput = document.getElementById('tweet-content-input')
const tweetsList = document.getElementById('tweets-list')
const template = document.querySelector('#tweet-item-template')

const LOCAL_STORAGE_PREFIX = 'DAKINA'
const TWEET_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-tweet`
const TAG_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-saved-tags`

let tweets = loadTweets()
tweets.forEach(renderTweets)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const tagForm = document.getElementById('tag-selector')
const tagSelectorButton = document.getElementById('tag-selector-button')
const tagSelectorForm = document.getElementById('tag-selector-form')
const tagTemplate = document.querySelector('#tweet-tag-template')
const newTagInput = document.getElementById('add-new-tag')
const tagsList = document.getElementById('tags-list')

let tags = loadTags()
tags.forEach(renderNewTag)

// TAG SELECTOR MODAL:
tagSelectorButton.addEventListener('click', closeTagModal)

function closeTagModal() {
  tagForm.classList.toggle('hidden')
  tagForm.classList.toggle('flex')
}

// CREATE NEW TAGS AND LOAD TO TAGS LIST:
tagSelectorForm.addEventListener('submit', e => {
  e.preventDefault()

  const newTag = {
    tag: newTagInput.value,
  }
  tags.push(newTag)
  renderNewTag(newTag)
  saveTags()
})
loadTags()
// RENDER TAGS:
function renderNewTag() {
  const templateTagClone = tagTemplate.content.cloneNode(true)
  const tagElement = templateTagClone.querySelector('[data-tweet-tag]')
  tagElement.innerText = newTagInput.value
  tagsList.appendChild(templateTagClone)
}
// SAVE NEW TAGS TO TWEET:
function saveTags() {
  localStorage.setItem(TAG_STORAGE_KEY, JSON.stringify(tags))
}
// LOAD TAGS:
function loadTags() {
  const tagString = localStorage.getItem(TAG_STORAGE_KEY)
  return JSON.parse(tagString) || []
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CHARACTER LIMIT:
const characterindicator = document.getElementById('character-indicator')
characterindicator.textContent = 0 + '/280'

const countCharacters = () => {
  let numOfEnteredCharacters = tweetContentInput.value.length
  let counter = numOfEnteredCharacters
  characterindicator.textContent = counter + '/280'

  if (numOfEnteredCharacters > 280) {
    characterindicator.classList.add('text-red-500')
    characterindicator.classList.add('text-sm')
  } else {
    characterindicator.classList.remove('text-red-500')
    characterindicator.classList.remove('text-sm')
  }
}

tweetContentInput.addEventListener('input', countCharacters)
form.addEventListener('submit', () => {
  characterindicator.textContent = 0 + '/280'
})

// HIDE PROP TWEET:
const propTweet = document.querySelector('.prop-tweet')
if (tweets.length > 0) {
  propTweet.classList.remove('flex')
  propTweet.classList.add('hidden')
}

form.addEventListener('submit', e => {
  e.preventDefault()

  const newTweetTitle = tweetTitleInput.value
  const newTweetContent = tweetContentInput.value
  const newTagName = newTagInput.value
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
    contentError.innerText = 'Content missing!'
  } else if (newTweetTitle.length < 1 && newTweetContent.length < 1) {
    titleError.classList.remove('hidden')
    titleError.classList.add('flex')
    contentError.classList.remove('hidden')
    contentError.classList.add('flex')
  } else if (newTweetContent.length > 280) {
    contentError.classList.remove('hidden')
    contentError.classList.add('flex')
    contentError.innerText = 'Too many characters!'
  } else {
    const newTweet = {
      title: newTweetTitle,
      content: newTweetContent,
      tag: newTagName,
      id: new Date().valueOf().toString(),
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

// DELETE SINGLE TWEET:
const deleteButton = document.querySelector('delete-button')
