console.log('heyy')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const url = `http://localhost:3000/weather?address=${location}`
    fetch(url).then((responce) => {
        responce.json().then((data) => {
            if (data.error){
                messageOne.textContent = data.error
            } else {
                console.log(data.location)
                console.log(data.forecast)
                messageOne.textContent = data.location
                messageTwo.textContent = `${data.forecast.weather_description}. temperature: ${data.forecast.temperature}. feelslike: ${data.forecast.feelslike}`
            }
        }).catch((error) => {
            console.log(error)
        })
    })
})