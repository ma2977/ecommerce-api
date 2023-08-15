const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const getAll = catchError(async(req, res) => {
    const results = await User.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const {firstName, lastName, email, password, phone} = req.body
    console.log(firstName)
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
        firstName, 
        lastName, 
        email, 
        password : hashedPassword, 
        phone});
    return res.status(201).json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    delete req.body.password
    delete req.body.email
    const result = await User.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async(req,res)=>{

    const {email,password} = req.body
    const user = await User.findOne({where:{email}})
    if(!user) return res.sendStatus(401)

    const isValidPassword  = await bcrypt.compare(password, user.password)
    if(!isValidPassword) return res.sendStatus(401)

    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        {expiresIn:"1d"}
    )

    return res.json({user,token})

})

module.exports = {
    getAll,
    create,
    remove,
    update,
    login
}