const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const one = document.querySelector('#one')
const two = document.querySelector('#two')
// one.textContent = "Loading..."

weatherForm.addEventListener('submit', (e) => {
    two.textContent = ''
    e.preventDefault()
    one.textContent = "Loading..."
    const location = search.value
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => { 
            one.textContent = ''
            if (data.error) {
                two.textContent = data.error
            } else {
                two.textContent = data.description + data.temperature + data.feelslike + data.place_name
            }
        })
    })
})