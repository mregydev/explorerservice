var jwt = require('jsonwebtoken')

var app = require('express')()

var bodyParser = require('body-parser')

const fs = require('fs')

var readFile = require('util').promisify(fs.readFile)

app.use(bodyParser.json())

app.get("/test", (req, res) => {
    res.send("application is listeing")
})



app.use((req, res, next) => {

    let username = req.body.userName

    let password = req.body.password


    if (!username || !password) {
        res.sendStatus(422)
    }
    else {
        next()
    }
})

app.post('/register', (req, res) => {

    let username = req.body.userName
    let password = req.body.password


    let users = JSON.parse(fs.readFileSync('users.json').toString())



    for (var key in users) {
        if (users[key].username == username) {
            res.sendStatus(409)
            res.end()
            return
        }
    }

    users.push({ username, password })

    console.log(JSON.stringify(users))

    fs.writeFileSync('users.json', JSON.stringify(users))

    res.end("User Registered")
})


app.post('/login', (req, res) => {

    let username = req.body.userName
    let password = req.body.password

    let users = JSON.parse(fs.readFileSync('users.json'))

    for (var key in users) {
        if (users[key].username == username && users[key].password == password) {
            res.end(JSON.stringify({
                token: jwt.sign({ username, password }, 'wekala')
            }))
        }
    }

    res.sendStatus(401)
    res.end()


})



app.listen(6080)


console.log("listening")



