const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

app.use(express.json())


const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

let color = 0
app.get('/', (request, response) => {
    response.send('<div>' +
        '<h1>Hell World!</h1>' +
        `<p>${color}</p>` +
        '</div>')
})


app.get('/ESP', (request, response) => {
    response.send({R:color[0], G:color[1], B:color[2]})
})


app.post('/ECG', (request, response) => {
    color = request.body
    console.log(color)
    response.json(color)
})

app.get('/notes', (request, response) => {

    response.json({"bruh":"maachuida"})
})