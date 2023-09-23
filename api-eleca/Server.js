const express = require('express')
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/static', express.static('static'))


// Database Connection
const db = require('./auth/dbConnect')
db.connect(e => !e ? console.log('dbConnected...') : console.log('Error in dbConnect...'))

// Cors
const cors = require('cors')

// const whiteList = ['https://eleca.shre.in', 'https://www.eleca.shre.in', 'http://eleca.shre.in', '', undefined]
const whiteList = ['http://localhost:3000', undefined]

const corsOption = {
    origin: (origin, cb) => {
        if(whiteList.indexOf(origin) !== -1) {
            cb(null, true)
        } else {
            cb('Not allowed : ' + origin)
        }
    }
}

app.use(cors(corsOption))


// Routes
const UserRoutes = require('./routes/userRoute')
const AdminRoutes = require('./routes/adminRoute')
const { loginRoute, isLoggedin } = require('./auth/loginAuth')

app.use(UserRoutes)
app.use(loginRoute)
app.use('/admin', isLoggedin, AdminRoutes)


// Not Found Error
app.get('*', (req, res) => {
    console.log(req.body)
    return res.status(404).json({
        msg: 'Route not found!'
    })
})
app.post('*', (req, res) => {
    return res.status(404).json({
        msg: 'Route not found!'
    })
})

app.listen(5000, () => console.log("Server running...."))