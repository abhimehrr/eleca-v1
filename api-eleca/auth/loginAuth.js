const Router = require('express').Router()
const bcrypt = require('bcryptjs')

// Database
const db = require('./dbConnect')
const { secretStr } = require('./Secrets')

const jwt = require('jsonwebtoken')



// Check Login
const isLoggedin = (req, res, next) => {
    const authToken = req.headers.authtoken

    if(!authToken) {
        return res.status(401).json({
            access: 'denied',
            msg: 'Auth token is required'
        })
    }

    const verify = verifyToken(authToken)

    if(!verify.err) {
        db.query('SELECT * FROM admin WHERE ID=?', [ verify.auth.auth.ID ], (e, r) => {
            if(e) {
                return res.status(500).json({
                    msg: 'Some database error : /Login Auth (isLoggedin)/',
                    err: JSON.parse(JSON.stringify(e)).sqlMessage
                })
            }

            req.headers.admin = verify.auth.auth.Name
            
            next()
        })
    } else {
        return res.status(403).json(verify)   
    }
}


// Login
Router.post('/login', (req, res) => {
    const { username, password } = req.body
    
    var query = 'SELECT * FROM admin WHERE email=? OR mobile=?'
    db.query(query, [ username, username ], (e, r) => {
        if(e) {
            return res.status(500).json({
                msg: 'Some database error : /Login Auth/',
                err: JSON.parse(JSON.stringify(e)).sqlMessage
            })
        }

        if(r.length < 1) {
            return res.status(401).json({
                access: 'denied',
                msg: 'Invalid username or password',
                authToken: null
            })
        }

        bcrypt.compare(password, r[0].password).then(matched => {
            if(!matched) {
                return res.status(401).json({
                    access: 'denied',
                    msg: 'Invalid username or password',
                    authToken: null
                })
            }

            return res.status(200).json({
                access: 'allowed',
                msg: 'Login successfull...',
                authToken: signToken({
                    ID : r[0].ID,
                    Name : r[0].name,
                    Email : r[0].email
                })
            })
        })
    })
})
















// Sign Token
const signToken = (auth) => {
    return jwt.sign({
        auth,
        iat: Date.now(),
        exp: Date.now() + 1000 * 60 * 60 * 24
    }, secretStr)
}


// Verify TOken
const verifyToken = (token) => {
    try {
        var auth = jwt.verify(token, secretStr)

        if(auth.exp < Date.now()) {
            return {
                msg: 'Token expired...',
                auth: null,
                err: 'tokenExpired'
            }
        }

        return {
            msg: 'Token is verified successfully...',
            auth,
            err: null
        }
    } catch (error) {
        var e = JSON.parse(JSON.stringify(error))
        e.expiredAt = new Date(e.expiredAt).toLocaleString()

        return {
            msg: 'Some error occured',
            auth: null,
            err: e
        }
    }
}

// console.log(signToken({name:'abhishek',id:'3232',isAdmin:true}))


// console.log(verifyToken('eyJhbGciOiJIUz1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjp7Im5hbWUiOiJhYmhpc2hlayIsImlkIjoiMzIzMiIsImlzQWRtaW4iOnRydWV9LCJpYXQiOjE2OTUzODcwMzYzMTAsImV4cCI6MTY5NTM4NzA5NjMxMH0.XjmuNoKpOoywmdnfWD3SSm2obuEzuR27lL9fcWAiUcA'))


// console.log(new Date(1694523060968).toLocaleString())
// console.log(signToken('dkdk'))

// var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjp7IklEIjoxMDAwMDAwLCJOYW1lIjoiQWJoaXNoZWsiLCJFbWFpbCI6ImFiaGlAc2hyZS5pbiIsIk1vYmlsZSI6NzM2MTA5MjgxMH0sImlhdCI6MTY5NDUyMDY0NjA1MywiZXhwIjoxNjk0NTYzODQ2MDUzfQ.2afpbafkHoUjErA-Jc5CbwjDWAIxuXUeYdOAFZJ5IVo'

// try {
//     const t = verifyToken(token)
//     console.log('Verify : ', t)
// } catch (error) {
//     var e = JSON.parse(JSON.stringify(error))
//     e.expiredAt = new Date(e.expiredAt).toLocaleString()
//     console.log(e)
// }




module.exports = {
    loginRoute : Router,
    isLoggedin
}