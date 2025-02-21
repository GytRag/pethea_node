const express = require('express');
const router = express.Router();

const {
    register,
    login,
    allPets,
    addPet,
    deletePet,
    pet,
    addMedication,
    allMeds,
    deleteMedication,
    editeMedication,
    addLog,
    addPres,
    allPresLogs,
    loginUser,
    myPets,
    updatePassword,
    gallery
} = require('../controllers/mainControllers')

const {
    validateRegister,
    validateLogin,
    doctorValidator,
    passwordValidator
} = require('../middleware/validators')

const userAuth = require('../middleware/userAuth')

router.post('/register',validateRegister, passwordValidator, register)
router.post('/login',validateLogin, login)
router.post('/loginuser',validateLogin, loginUser)
router.post('/updatepass',userAuth, passwordValidator, updatePassword)


router.get('/pets',userAuth,doctorValidator, allPets)
router.get('/pets/:id',userAuth, pet)
router.get('/meds',userAuth, allMeds)
router.get('/preslogs/:id',userAuth, allPresLogs)
router.get('/mypets',userAuth, myPets)
router.get('/gallery', gallery)



router.post('/addpet',userAuth,doctorValidator, addPet)
router.post('/deletepet',userAuth,doctorValidator, deletePet)
router.post('/addmedc',userAuth,doctorValidator, addMedication)
router.post('/medsdelete/:id',userAuth,doctorValidator, deleteMedication)
router.post('/medsedite/:id',userAuth,doctorValidator, editeMedication)
router.post('/logs',userAuth,doctorValidator, addLog)
router.post('/pres',userAuth,doctorValidator, addPres)

module.exports = router;