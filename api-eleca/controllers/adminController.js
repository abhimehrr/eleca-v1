// Database
const db = require('../auth/dbConnect')


// Fetch All Services
const fetchServices = (req, res) => {
    db.query('SELECT * FROM services', (e, r) => {
        if(e) {
            return res.status(500).json({
                msg: 'Some database error : /Fetch Services/',
                err: JSON.parse(JSON.stringify(e)).sqlMessage
            })
        }

        const filter = r.filter(re => re.isDeleted === 'false')

        return res.status(200).json({
            msg: 'Result found!',
            data: filter
        })
    })
}

// Fetch All Deleted Services
const fetchDeletedServices = (req, res) => {
    db.query('SELECT * FROM services', (e, r) => {
        if(e) {
            return res.status(500).json({
                msg: 'Some database error : /Fetch Services/',
                err: JSON.parse(JSON.stringify(e)).sqlMessage
            })
        }

        const filter = r.filter(re => re.isDeleted === 'true')

        return res.status(200).json({
            msg: 'Result found!',
            data: filter
        })
    })
}

// Search Services
const searchServices = (req, res) => {
    const { search } = req.body

    var query = 'SELECT * FROM services WHERE ID=? OR cMobile=?'
    db.query(query, [search, search], (e, r) => {
        if(e) {
            return res.status(500).json({
                msg: 'Some database error : /Search Services/',
                err: JSON.parse(JSON.stringify(e)).sqlMessage
            })
        }

        if(filter.length < 1) {
            return res.status(200).json({
                msg: 'Result not found!',
                data: []
            })
        }

        return res.status(200).json({
            msg: 'Result found!',
            data: r
        })
    })
}


// Update Service Request
const updateService = (req, res) => {
    const { 
        sid, name, mobile, address, estAmt, advanceAmt, itemType, itemName, issues, currentStatus, image
    } = req.body

    var query = 'UPDATE services SET itemName=?, cName=?, cMobile=?, cAddress=?, estAmt=?, advanceAmt=?, itemType=?, issues=?, currentStatus=?, image=? WHERE ID=?'
    var values = [ itemName, name, mobile, address, estAmt, advanceAmt, itemType, issues, currentStatus, image, sid ]
    db.query(query, values, (e, r) => {
        if(e) {
            return res.status(500).json({
                msg: 'Some database error : /Update Services 1/',
                err: JSON.parse(JSON.stringify(e)).sqlMessage
            })
        }

        return res.status(200).json({
            msg: 'Service updated successfully...',
            data: r
        })
    })
}


// Update Total Amount
const updateTotalAmount = (req, res) => {
    const { id, totalAmt } = req.body

    var query = 'UPDATE services SET totalAmt=? WHERE ID=?'
    var values = [ totalAmt, id ]
    db.query(query, values, (e, r) => {
        if(e) {
            return res.status(500).json({
                msg: 'Some database error : / Update Total Amount/',
                err: JSON.parse(JSON.stringify(e)).sqlMessage
            })
        }

        return res.status(200).json({
            msg: 'Total Amount updated successfully...',
            data: r
        })
    })
}

// Update Advance Amount
const updateAdvanceAmount = (req, res) => {
    const { id, advanceAmt } = req.body

    var query = 'UPDATE services SET advanceAmt=? WHERE ID=?'
    var values = [ advanceAmt, id ]
    db.query(query, values, (e, r) => {
        if(e) {
            return res.status(500).json({
                msg: 'Some database error : / Update Advance Amount/',
                err: JSON.parse(JSON.stringify(e)).sqlMessage
            })
        }

        return res.status(200).json({
            msg: 'Advance Amount updated successfully...',
            data: r
        })
    })
}


// Delete Service Request
const deleteService = (req, res) => {
    const { sid } = req.body

    var query = 'UPDATE services SET isDeleted=? WHERE ID=?'
    db.query(query, [ 'true', sid ], (e, r) => {
        if(e) {
            return res.status(500).json({
                msg: 'Some database error : /Search Services 1/',
                err: JSON.parse(JSON.stringify(e)).sqlMessage
            })
        }

        if(r.affectedRows == 1) {
            return res.status(200).json({
                msg: 'Service request deleted successfully...',
                data: r
            })
        }
        return res.status(200).json({
            msg: 'Service request not found...',
            data: r
        })
    })
}



// Search Customer
const searchCustomer = (req, res) => {
    const { mobile } = req.body

    db.query('SELECT * FROM users WHERE mobile=?', [ mobile ], (e, r) => {
        if(e) {
            return res.status(500).json({
                msg: 'Some database error : /Search Customer/',
                err: JSON.parse(JSON.stringify(e)).sqlMessage
            })
        }
        
        return res.status(200).json({
            msg: 'Result found!',
            data: r[0]
        })
    })
}

// Register a new service
const newService = (req, res) => {
    const {
        name, mobile, address,
        itemName, estAmt, advanceAmt,
        itemType, issues, image
    } = req.body

    const adminName = req.headers.admin

    db.query('SELECT * FROM users WHERE mobile=?', [ mobile ], (e, r) => {
        if(e) {
            return {
                msg: 'Some database error : /New Service 1/',
                err: JSON.parse(JSON.stringify(e)).sqlMessage
            }
        }
        if(r.length < 1) {
            var query = 'INSERT INTO users (name, mobile, address) VALUES (?, ?, ?)'
            db.query(query, [name, mobile, address], (e, r) => {
                if(e) {
                    return res.status(500).json({
                        msg: 'Some database error : /New Service 2/',
                        err: JSON.parse(JSON.stringify(e)).sqlMessage
                    })
                }
            })
        }
        
        var query = 'INSERT INTO services (itemName, cName, cMobile, cAddress, estAmt, advanceAmt, itemType, currentStatus, issues, image, adminName, isDeleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        var values = [itemName, name, mobile, address, estAmt, advanceAmt, itemType, 'Accepted', issues, image, adminName, 'false']
        db.query(query, values, (e, r) => {
            if(e) {
                return res.status(500).json({
                    msg: 'Some database error : /New Service 3/',
                    err: JSON.parse(JSON.stringify(e)).sqlMessage
                })
            }
            
            var query = 'INSERT INTO process (serviceID, status, time) VALUES (?, ?, ?)'
            var values = [r.insertId, 'Accepted', getTime()]
            db.query(query, values, (err, re) => {
                if(err) {
                    return res.status(500).json({
                        msg: 'Some database error : /Service Process 1/',
                        err: JSON.parse(JSON.stringify(err)).sqlMessage
                    })
                }

                return res.status(200).json({
                    msg: 'Service registered successfully...',
                    data: r
                })
            })
        })
    })
}


// Process Service
const serviceProcess = (req, res) => {
    const { sid, status, comments, image } = req.body

    var query = 'INSERT INTO process (serviceID, status, comments, image, time) VALUES (?, ?, ?, ?, ?)'
    var values = [sid, status, comments, image, getTime()]
    db.query(query, values, (e, r) => {
        if(e) {
            return res.status(500).json({
                msg: 'Some database error : /Service Process 1/',
                err: JSON.parse(JSON.stringify(e)).sqlMessage
            })
        }
        var query = 'UPDATE services SET currentStatus=? WHERE ID=?'
        db.query(query, [status, sid], (err, re) => {
            if(err) {
                return res.status(500).json({
                    msg: 'Some database error : /Service Process 2/',
                    err: JSON.parse(JSON.stringify(err)).sqlMessage
                })
            }
        })

        return res.status(200).json({
            msg: 'Service processed successfully...',
            data: r
        })
    })
}


// Fetch All Warranty Card 
const fetchAllWarrantyCards = (req, res) => {
    var query = 'SELECT * FROM warrantycard'
    db.query(query, (e, r) => {
        if(e) {
            return res.status(500).json({
                msg: 'Some database error : /Fetch All Warranty Cards/',
                err: JSON.parse(JSON.stringify(e)).sqlMessage
            })
        }
        return res.status(200).json({
            msg: 'Result found!',
            data: r
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

// Register a Warranty Card
const registerWarrantyCard = (req, res) => {
    const { itemName, name, mobile, address, image, comments, period } = req.body
    const { admin } = req.headers

    var query = 'INSERT INTO warrantycard (itemName, cName, cMobile, cAddress, dop, image, comments, adminName, period) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    var values = [ itemName, name, mobile, address, getTime(), image, comments, admin, period ]
    
    db.query(query, values, (e, r) => {
        if(e) {
            return res.status(500).json({
                msg: 'Some database error : /Register Warranty Card 1/',
                err: JSON.parse(JSON.stringify(e)).sqlMessage
            })
        }

        db.query('SELECT * FROM users WHERE mobile=?', [ mobile ], (err, re) => {
            if(err) {
                return res.status(500).json({
                    msg: 'Some database error : /Register Warranty Card 2/',
                    err: JSON.parse(JSON.stringify(err)).sqlMessage
                })
            }

            if(re.length < 1) {
                var query = 'INSERT INTO users (name, mobile, address) VALUES (?, ?, ?)'
                var values = [ name, mobile, address ]
                db.query(query, values, (error, result) => {
                    if(error) {
                        return res.status(500).json({
                            msg: 'Some database error : /Register Warranty Card 3/',
                            err: JSON.parse(JSON.stringify(error)).sqlMessage
                        })
                    }
                })
            }
        })
        
        return res.status(200).json({
            msg: 'Warranty card registered successfully...',
            data: r
        })
    })
}


// Fetch Price List
const fetchPriceList = (req, res) => {
    db.query('SELECT * FROM pricelist', (e, r) => {
        if(e) {
            return res.status(500).json({
                msg: 'Some database error : /Fetch Price List/',
                err: JSON.parse(JSON.stringify(e)).sqlMessage
            })
        }
        return res.status(200).json({
            msg: 'Result found!',
            data: r
        })
    })
}

// Add Product to Price List 
const addProduct = (req, res) => {
    const { product, productId, rlp, mrp } = req.body

    var query = 'INSERT INTO pricelist (product, productId, rlp, mrp) VALUES (?, ?, ?, ?)'
    db.query(query, [ product, productId, rlp, mrp ], (e, r) => {
        if(e) {
            return res.status(500).json({
                msg: 'Some database error : /Add Product to Price List/',
                err: JSON.parse(JSON.stringify(e)).sqlMessage
            })
        }
        return res.status(200).json({
            msg: 'Product added to price list successfully...',
            data: r
        })
    })

}


// Add Product to Price List 
const deleteProduct = (req, res) => {
    const { id } = req.body

    var query = 'DELETE FROM pricelist WHERE ID=?'
    db.query(query, [ id ], (e, r) => {
        if(e) {
            return res.status(500).json({
                msg: 'Some database error : /Deleteing Product from Price List/',
                err: JSON.parse(JSON.stringify(e)).sqlMessage
            })
        }
        return res.status(200).json({
            msg: 'Product deleted successfully from price list...',
            data: r
        })
    })

}

// Add Product to Price List 
const updateProduct = (req, res) => {
    const { id, product, productId, rlp, mrp } = req.body

    var query = 'UPDATE pricelist SET product=?, productId=?, rlp=?, mrp=? WHERE ID=?'
    db.query(query, [ product, productId, rlp, mrp, id ], (e, r) => {
        if(e) {
            return res.status(500).json({
                msg: 'Some database error : /Updating Product in Price List/',
                err: JSON.parse(JSON.stringify(e)).sqlMessage
            })
        }
        return res.status(200).json({
            msg: 'Product updated successfully in price list...',
            data: r
        })
    })
}



// Get Time (Production)
const getTime = () => {
    var d = new Date().toLocaleString()
    return d
}

// Get Time (Live)
// const getTime = () => {
//     var date = new Date().toLocaleString()
//     date = date.split(',')
//     var newDate = date[0].split('/')
//     newDate = newDate[1] + '/' + newDate[0] + '/' + newDate[2]
//     return newDate + ', ' + date[1]
// }


module.exports = {
    fetchServices,
    searchServices,
    deleteService,
    updateService,
    updateTotalAmount,
    updateAdvanceAmount,
    searchCustomer,
    newService,
    serviceProcess,
    fetchAllWarrantyCards,
    checkWarrantyCard,
    registerWarrantyCard,
    fetchPriceList,
    addProduct,
    deleteProduct,
    updateProduct
}