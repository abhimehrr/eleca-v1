const Router = require('express').Router()


// User Controllers
const User = require('../controllers/userController')

// Routes
Router.post('/check-service-request', User.checkServiceRequest)
Router.post('/service-details', User.serviceDetails)
Router.post('/search-customer', User.searchCustomer)
Router.post('/check-warranty-card', User.checkWarrantyCard)

// Reset Password
Router.post('/reset-password', User.resetPassword)

// Export Routes
module.exports = Router