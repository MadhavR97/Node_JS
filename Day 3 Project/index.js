const http = require('http')
const port = 3000;

const portHandler = (req, res) => {
    res.write('<h1>Welcome to NodeJS</h1>')
    res.end()
}

const server = http.createServer(portHandler)

server.listen(port, (error) => {
    error ? console.log(error) : console.log(`Server Started on port : ${port}`)
})