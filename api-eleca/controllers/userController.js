const bcrypt = require('bcryptjs')

// DB
const db = require('../auth/dbConnect')
const { secretStr } = require('../auth/Secrets')


// Reset Password
const resetPassword = (req, res) => {
    const { username, password, pin } = req.body

    var query = 'SELECT * FROM admin WHERE email=? OR mobile=?'
    db.query(query, [ username, username ], (e, r) => {
        if(e) {
            return res.status(500).json({
                msg: 'Some database error : /Reset Password (User) 1/',
                err: JSON.parse(JSON.stringify(e)).sqlMessage
            })
        }

        if(r.length < 1) {
            return res.status(200).json({
                msg: 'Invalid mobile or email and PIN',
                data: false
            })
        }

        if(r[0].pin != pin) {
            return res.status(200).json({
                msg: 'Invalid mobile or email and PIN',
                data: false
            })
        }
        
        bcrypt.hash(password, 10).then(hashed => {
            var query = 'UPDATE admin SET password=? WHERE mobile=?'
            db.query(query, [ hashed, r[0].mobile ], (err, re) => {
                if(err) {
                    return res.status(500).json({
                        msg: 'Some database error : /Reset Password (User) 2/',
                        err: JSON.parse(JSON.stringify(err)).sqlMessage
                    })
                }
                return res.status(200).json({
                    msg: 'Password reset successfull...',
                    data: true
                })
            })
            
        })
    })
}


// Search Customer
const searchCustomer = (req, res) => {
    const { mobile } = req.body

    var query = 'SELECT * FROM users WHERE mobile=?'
    db.query(query, [ mobile ], (e, r) => {
        if(e) {
            return res.status(500).json({
                msg: 'Some database error : /Search Customer (User)/',
                err: JSON.parse(JSON.stringify(e)).sqlMessage
            })
        }
        if(r.length < 1) {
            return res.status(200).json({
                msg: 'Result not found!',
                data: false
            })
        }

        return res.status(200).json({
            msg: 'Result found!',
            data: r[0]
        })
    })
}


// Check Service Request
const checkServiceRequest = (req, res) => {
    const { search } = req.body

    var query = 'SELECT * FROM services WHERE cMobile=? OR ID=?'
    db.query(query, [ search, search ], (e, r) => {
        if(e) {
            return res.status(500).json({
                msg: 'Some database error : /Check Service Request/',
                err: JSON.parse(JSON.stringify(e)).sqlMessage
            })
        }

        const filter = r.filter(re => re.isDeleted === 'false')

        if(filter.length < 1) {
            return res.status(200).json({
                msg: 'Result not found!',
                data: []
            })
        }
        return res.status(200).json({
            msg: 'Result found!',
            data: filter
        })
    })
}


// Service Details
const serviceDetails = (req, res) => {
    const { sid } = req.body

    var query = 'SELECT * FROM services WHERE ID=?'
    db.query(query, [ sid ], (e, r) => {
        if(e) {
            return res.status(500).json({
                msg: 'Some database error : /Service Details 1/',
                err: JSON.parse(JSON.stringify(e)).sqlMessage
            })
        }

        const filter = r.filter(re => re.isDeleted === 'false')
        
        if(filter.length < 1) {
            return res.status(200).json({
                msg: 'Result not found!',
                data: [[], []]
            })
        }
        
        var query = 'SELECT * FROM process WHERE serviceID=?'
        db.query(query, [ sid ], (err, re) => {
            if(err) {
                return res.status(500).json({
                    msg: 'Some database error : /Service Details (Process) 2/',
                    err: JSON.parse(JSON.stringify(err)).sqlMessage
                })
            }

            return res.status(200).json({
                msg: 'Result found!',
                data: [filter[0], re]
            })
        })
    })
}

// Check Warranty Card 
const checkWarrantyCard = (req, res) => {
    const { search } = req.body

    var query = 'SELECT * FROM warrantycard WHERE cMobile=? OR ID=?'
    db.query(query, [ search, search ], (e, r) => {
        if(e) {
            return res.status(500).json({
                msg: 'Some database error : /Check Warranty Card/',
                err: JSON.parse(JSON.stringify(e)).sqlMessage
            })
        }

        if(r.length < 1) {
            return res.status(200).json({
                msg: 'Result not found!',
                data: r
            })
        }
        
        return res.status(200).json({
            msg: 'Result found!',
            data: r
        })
    })
}



// Export Modules
module.exports = { 
    resetPassword,
    searchCustomer,
    checkServiceRequest,
    serviceDetails,
    checkWarrantyCard
}