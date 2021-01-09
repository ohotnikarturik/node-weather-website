// fetch weather from client side(browser) by endpoint from server side

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherImg = document.querySelector('#weather-img')


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = searchInput.value
  
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch(
    `http://localhost:3000/weather?address=${location}`
  )
    .then((response) => response.json()
    .then((data) => {
      if(data.error) {
        messageOne.textContent = data.error
        messageTwo.textContent = ''
    } else {
      messageOne.textContent = data.location
      messageTwo.textContent = data.forecast
      weatherImg.src = data.weatherImg
    }
  }))
})

