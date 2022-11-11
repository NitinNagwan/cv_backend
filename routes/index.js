const employeeController = require('../controllers/employeeController')
const expertiseController = require('../controllers/expertiseController')
const interestController = require('../controllers/interestsController')
const createCvController = require('../controllers/createCvController')
const keyQualityController = require('../controllers/keyQualitiesController')
const createPdf = require('../controllers/createPdf')
var path = require("path");
const upload = require('../middlewares/upload')
const uploadImage = require('../controllers/uploadImage')
const router = require('express').Router()

// router.get('/api/getEmployeeDetails',getEmployeeDetails)
// router.post('/api/login', login)
// router.post('/api/isverify',verifyToken,verify)
// router.post('/api/employeDetails',employeDetails)
// router.post('/api/updateCV',updateEmployeeCv)
// router.post('/api/uploadImage',uploadImage )




// New Apis
router.post('/employee',employeeController.addEmployee)
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


router.post('/cv',createCvController.addCv)
router.put('/cv/:id',createCvController.editCv)

router.post('/quality', keyQualityController.addQuality)
router.put('/quality/:id',keyQualityController.editQuality)
router.get('/quality/:id',keyQualityController.fetchQuality)
router.post('/quality-list',keyQualityController.qualityList)


router.post('/create_pdf/:id',createPdf.create)
// router.post('/admin/create_pdf/:id',(req,res)=>{
//     res.render(path.join(__dirname, "../views/createCvPdf")
//     ,{
//       record: "",
//       printBackground: true
//     },)
// })


router.post('/uploadProfileImage/',upload.single('profile_image'),uploadImage.image)



module.exports = router