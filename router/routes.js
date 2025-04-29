const express = require('express');
const router = express.Router();

const {
    register,
    registerUser,
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
    gallery,
    updateImage,
    home
} = require('../controllers/mainControllers')

const {
    validateRegister,
    validateLogin,
    doctorValidator,
    passwordValidator,
    validateRegisterUser
} = require('../middleware/validators')

const userAuth = require('../middleware/userAuth')

// register
router.post('/register',validateRegister, passwordValidator, register)
router.post('/registerUser',validateRegisterUser, passwordValidator, registerUser)

// login
router.post('/login',validateLogin, login)
router.post('/loginuser',validateLogin, loginUser)

// update user & doctor
router.post('/updatepass',userAuth, passwordValidator, updatePassword)
router.post('/updateimg',userAuth, updateImage)

// pets
router.get('/pets',userAuth,doctorValidator, allPets)
router.get('/pets/:id',userAuth, pet)
router.get('/mypets',userAuth, myPets)
router.post('/addpet',userAuth,doctorValidator, addPet)
router.post('/deletepet',userAuth,doctorValidator, deletePet)

// medication
router.get('/meds',userAuth, allMeds)
router.post('/addmedc',userAuth,doctorValidator, addMedication)
router.post('/medsdelete/:id',userAuth,doctorValidator, deleteMedication)
router.post('/medsedite/:id',userAuth,doctorValidator, editeMedication)

// pres & logs
router.get('/preslogs/:id',userAuth, allPresLogs)
router.post('/logs',userAuth,doctorValidator, addLog)
router.post('/pres',userAuth,doctorValidator, addPres)

// galllery & index page
router.get('/gallery', gallery)
router.get('/home', home)

module.exports = router;