const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

app.use(express.json())

let color = []
app.get('/', (request, response) => {
    response.send('<div>' +
        '<p>Hello World!</p>' +
        `<p>Red: ${color[0]}</p>` +
        `<p>Green: ${color[1]}</p>` +
        `<p>Blue: ${color[2]}</p>` +
        '</div>')
})
const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.post('/bruh', (request, response) => {
    const note = request.body
    console.log(note)
    response.json(note)
})

app.post('/RGB', (request, response) => {
    color = request.body
    console.log(color)
    response.json(color)
})

app.get('/notes', (request, response) => {

    response.json({"bruh":"maachuida"})
})