const employeeController = require('../controllers/employeeController')
const expertiseController = require('../controllers/expertiseController')
const interestController = require('../controllers/interestsController')
const createCvController = require('../controllers/createCvController')
const keyQualityController = require('../controllers/keyQualitiesController')
const createPdf = require('../controllers/createPdf')
const upload = require('../middlewares/upload')
const uploadImage = require('../controllers/uploadImage')
const userController = require('../controllers/admin/userController')
const loginController = require('../controllers/loginController')
const admin_token_check = require('../middlewares/admin_token_check')

const router = require('express').Router()


// New Apis
router.post('/employee',admin_token_check,employeeController.addEmployee)
router.put('/employee/:id',admin_token_check,employeeController.editEmployee)
router.delete('/employee',admin_token_check,employeeController.deleteEmployee)
router.get('/employee/:id',admin_token_check,employeeController.fetchEmployee)
router.post('/employee-list',admin_token_check,employeeController.employeeList)


router.post('/expertise',admin_token_check,expertiseController.addExpertise)
router.put('/expertise/:id',admin_token_check,expertiseController.editExpertise)
router.get('/expertise/:id',admin_token_check,expertiseController.fetchExpertise)
router.post('/expertise-list',admin_token_check,expertiseController.expertiseList)


router.post('/interest',admin_token_check,interestController.addInterest)
router.put('/interest/:id',admin_token_check,interestController.editInterest)
router.get('/interest/:id',admin_token_check,interestController.fetchInterest)
router.post('/interest-list',admin_token_check,interestController.interestList)


router.post('/cv',admin_token_check,createCvController.addCv)
router.put('/cv/:id',admin_token_check,createCvController.editCv)

router.post('/quality',admin_token_check, keyQualityController.addQuality)
router.put('/quality/:id',admin_token_check,keyQualityController.editQuality)
router.get('/quality/:id',admin_token_check,keyQualityController.fetchQuality)
router.post('/quality-list',admin_token_check,keyQualityController.qualityList)


router.post('/create_pdf/:id',admin_token_check,createPdf.create)
router.post('/uploadProfileImage/:id',admin_token_check,upload.single('profile_image'),uploadImage.image)
router.post('/user', userController.addUser)
router.post('/login', loginController.login)

router.post('/logout',admin_token_check, loginController.logout)



module.exports = router