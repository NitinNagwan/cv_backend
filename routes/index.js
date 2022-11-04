const employeDetails = require('../controllers/employeController')
const getEmployeeDetails =require('../controllers/getEmployeeDetails')
const login = require('../controllers/loginController')
const updateEmployeeCv = require('../controllers/updateEmployeeCv')
const verify= require('../controllers/verifyController')
const verifyToken = require('../middleware/auth')
const uploadImage = require('../controllers/uploadImage')
const employeeController = require('../controllers/employeeController')
const expertiseController = require('../controllers/expertiseController')
const interestController = require('../controllers/interestsController')
const router = require('express').Router()
router.get('/api/getEmployeeDetails',getEmployeeDetails)
router.post('/api/login', login)
router.post('/api/isverify',verifyToken,verify)
router.post('/api/employeDetails',employeDetails)
router.post('/api/updateCV',updateEmployeeCv)
router.post('/api/uploadImage',uploadImage )



// New Apis
router.post('/employee',employeeController.addemployee)
router.put('/employee/:id',employeeController.editEmployee)
router.delete('/employee',employeeController.deleteEmployee)
router.get('/employee/:id',employeeController.fetchEmployee)
router.post('/employee-list',employeeController.employeeList)


router.post('/expertise',expertiseController.addExpertise)
router.put('/expertise/:id',expertiseController.editExpertise)
router.get('/expertise/:id',expertiseController.fetchExpertise)
router.post('/expertise-list',expertiseController.expertiseList)


router.post('/interest',interestController.addInterest)
router.put('/interest/:id',interestController.editInterest)
router.get('/interest/:id',interestController.fetchInterest)
router.post('/interest-list',interestController.interestList)

module.exports = router