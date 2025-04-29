const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const doctorSchema = require("../schemas/doctorSchema");
const petSchema = require("../schemas/petSchema");
const logsSchema = require("../schemas/logsSchema");
const presSchema = require("../schemas/presSchema");
const medsSchema = require("../schemas/medsSchema");
const userSchema = require("../schemas/userSchema");
const gallerySchema = require("../schemas/gallerySchema");

const mongoose = require('mongoose');

const products = [];

module.exports = {

    // REGISTER
    register: async (req, res) => {

        const {username, passOne} = req.body

        const doctorExist = await doctorSchema.findOne({username})
        if (doctorExist) return res.send({message: 'user exist', success: false})

        const salt = await bcrypt.genSalt(5);
        const hash = await bcrypt.hash(passOne, salt)

        const doctor = {
            name: username,
            password: hash,
            doctor: true
        }

        const newDoctor = new doctorSchema(doctor);
        await newDoctor.save()

        res.send({message: 'register ok', success: true});

    },
    registerUser: async (req, res) => {

        const {email, passOne} = req.body

        const userExist = await userSchema.findOne({client_email: email})
        if (userExist) return res.send({message: 'user exist', success: false})

        const salt = await bcrypt.genSalt(5);
        const hash = await bcrypt.hash(passOne, salt)

        const user = {
            client_email: email,
            password: hash
        }

        const newUser = new userSchema(user);
        await newUser.save()

        res.send({message: 'register ok', success: true});

    },

    // LOGIN
    login: async (req, res) => {

        const {username, password} = req.body

        const doctorExist = await doctorSchema.findOne({name: username})
        if (!doctorExist) return res.send({message: 'incorrect username or password', success: false})

        const result = await bcrypt.compare(password, doctorExist.password)

        if (!result) return res.send({message: 'incorrect username or password', success: false})


        let myUser = {...doctorExist._doc}
        delete myUser.password

        const token = jwt.sign(myUser, process.env.SECRET_KEY)

        return res.send({success: true, token, myUser})

    },
    loginUser: async (req, res) => {

        const {client_email, password} = req.body

        const userExist = await userSchema.findOne({client_email})
        if (!userExist) return res.send({message: 'incorrect username or password', success: false})

        const result = await bcrypt.compare(password, userExist.password)

        if (!result) return res.send({message: 'incorrect username or password', success: false})

        let myUser = {...userExist._doc}
        delete myUser.password

        const token = jwt.sign(myUser, process.env.SECRET_KEY)

        return res.send({message: 'login successful', success: true, token, myUser})

    },

    // update users & doctors
    updatePassword: async (req, res) => {

        const {passOne, user} = req.body

        const salt = await bcrypt.genSalt(5);
        const hash = await bcrypt.hash(passOne, salt)

        if(user.doctor) {
            await doctorSchema.findOneAndUpdate(
                {_id: user._id},{$set: {password: hash}})
        }

        if(!user.doctor) {
            await userSchema.findOneAndUpdate(
                {_id: user._id},{$set: {password: hash}})
        }

        return res.send({message: 'password updated', success: true})


    },
    updateImage: async (req, res) => {

        const {image, user} = req.body

        if(user.doctor){
            if(image.length > 0) {
                if(user.doctor) {
                    let myUser = await doctorSchema.findOneAndUpdate(
                        {_id: user._id},
                        {$set: {image}},
                        {new:true}
                    )
                    delete myUser.password

                    res.send({message: 'image updated', success: true, myUser})
                }
            }
        }

        if(!user.doctor) {
            let myUser = await userSchema.findOneAndUpdate(
                {_id: user._id},
                {$set: {image}},
                {new:true}
            )
            delete myUser.password

            res.send({message: 'image updated', success: true, myUser})
        }

    },

    // pets
    allPets: async (req, res) => {

        const pets = await petSchema.find()
        return res.send({message: 'all pets', success: true, pets})

    },
    allMeds: async (req, res) => {

        const meds = await medsSchema.find()

        return res.send({message: 'all meds', success: true, meds})
    },
    myPets: async (req, res) => {

        const {user} = req.body

        const pets = await petSchema.find({client_email: user.client_email})

        return res.send({message: 'my pets', success: true, pets})
    },
    pet: async (req, res) => {

        const id = req.params.id
        const pet = await petSchema.findOne({_id: id})
        const petLogs = await logsSchema.findOne({pet_id: id})
        const petPres = await presSchema.findOne({pet_id: id})
        return res.send({message: 'pet', success: true, pet, petLogs, petPres})
    },
    addPet: async (req, res) => {


        const {name, client_email} = req.body

        const existPet = await petSchema.findOne({name: name, client_email: client_email})
        if(existPet) return res.send({message: 'pet exist', success: false})


        const newPatient = {
            name: req.body.name,
            dob: req.body.dob,
            client_email: req.body.client_email
        }

        const newPet = new petSchema(newPatient);
        await newPet.save()

        // add a new user by email if one does not exist
        const existUser = await userSchema.findOne({client_email})
        if(existUser) return res.send({message: 'pet added', success: true})

        const salt = await bcrypt.genSalt(5);
        const hash = await bcrypt.hash(client_email, salt)

        const newUser = {
            client_email,
            password:hash
        }

        const addUser = new userSchema(newUser);
        await addUser.save()

        return res.send({message: 'pet && user added', success: true})
    },
    deletePet: async (req, res) => {

        const {id} = req.body

        const deletePet = await petSchema.findOneAndDelete({_id: id})
        if(!deletePet) return res.send({message: 'pet not deleted', success: false})
        await logsSchema.deleteMany({pet_id: id})
        await presSchema.deleteMany({pet_id: id})

        return res.send({message: 'pet deleted', success: true})
    },

    // medication
    addMedication: async (req, res) => {
        const {name, description} = req.body

        const existMeds = await medsSchema.findOne({name: name})
        if(existMeds) return res.send({message: 'medication exist', success: false})


        const newMeds = {
            name: name,
            description: description
        }

        const newMedication = new medsSchema(newMeds);
        await newMedication.save()

        return res.send({message: 'medication added', success: true})
    },
    deleteMedication: async (req, res) => {
        const id = req.params.id
        const deleteMeds = await medsSchema.findOneAndDelete({_id: id})
        return res.send({message: 'medication deleted', success: true})
    },
    editeMedication: async (req, res) => {
        const id = req.params.id
        const {name, description} = req.body

        if(name && description) {
            const editeMeds = await medsSchema.findOneAndUpdate(
                {_id: id},{name, description},)
            return res.send({message: 'medication edited', success: true})
        }

    },

    // press & log
    addLog: async (req, res) => {

        const {date, description, pet_id} = req.body


        const newItem = {
            description,
            date,
            pet_id
        }

        const newLog = new logsSchema(newItem);
        await newLog.save()

        return res.send({message: 'log added', success: true})
    },
    addPres: async (req, res) => {

        const {date, description, pet_id} = req.body

        const meds = await medsSchema.findOne({name: description})

        const newItem = {
            description,
            date,
            pet_id,
            medication_id: meds._id
        }

        const newPres = new presSchema(newItem);
        await newPres.save()

        return res.send({message: 'prescription added', success: true})
    },
    allPresLogs: async (req, res) => {

        const id = req.params.id

        const pres = await presSchema.find({pet_id: id})
        const logs = await logsSchema.find({pet_id: id})

        return res.send({message: 'all pres logs', success: true, pres, logs})
    },

    // index & gallery page
    gallery: async (req, res) => {

        const images = await gallerySchema.find()
        return res.send({message: 'All gallery', success: true, images})
    },
    home: async (req, res) => {

        const doctors = await doctorSchema.find({}, {password: 0})

        const img = [
            'https://live.themewild.com/medion/assets/img/product/01.png',
            'https://live.themewild.com/medion/assets/img/product/02.png',
            'https://live.themewild.com/medion/assets/img/product/03.png',
            'https://live.themewild.com/medion/assets/img/product/04.png',
            'https://live.themewild.com/medion/assets/img/product/05.png'
        ]

        if (products.length === 0) {
            for (let i = 0; i < img.length; i++) {
                const product = {
                    id: "A" + i,
                    image: img[i],
                    description: 'Some new product ' + i,
                    title: 'Product ' + i,
                    stars: 3,
                    price: 200
                }
                products.push(product)
            }
        }

        return res.send({success: true, doctors, products})
    },
}