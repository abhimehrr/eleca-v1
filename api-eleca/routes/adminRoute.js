const Router = require('express').Router()

// Upload File
const Upload = require('../controllers/uploadFiles')

// Admin Controller
const Admin = require('../controllers/adminController')


// Admin Routes
Router.get('/fetch-all-services', Admin.fetchServices)
Router.get('/search-services', Admin.searchServices)
Router.post('/add-new-service', Admin.newService)
Router.post('/delete-service', Admin.deleteService)
Router.post('/update-service', Admin.updateService)
Router.post('/update-total-amount', Admin.updateTotalAmount)
Router.post('/update-advance-amount', Admin.updateAdvanceAmount)

Router.get('/fetch-all-warranty-cards', Admin.fetchAllWarrantyCards)
Router.post('/check-warranty-card', Admin.checkWarrantyCard)
Router.post('/register-warranty-card', Admin.registerWarrantyCard)

Router.get('/fetch-price-list', Admin.fetchPriceList)
Router.post('/add-product', Admin.addProduct)
Router.post('/delete-product', Admin.deleteProduct)
Router.post('/update-product', Admin.updateProduct)

Router.post('/service-process', Admin.serviceProcess)

Router.post('/upload', Upload.single('image'), (req, res) => {
    return res.status(200).json({
        msg: 'File uploaded...',
        file: req.file
    })
})

module.exports = Router