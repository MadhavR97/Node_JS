const http = require('http')
const port = 3000

const portHandler = (req, res) => {
    res.write('<h1>Madhav</h1>')
    res.end()
}

const server = http.createServer(portHandler)

server.listen(port, (error) => {
    error ? console.log(error) : console.log(`Server started on port : ${port}`)
})