const User = require("../../models/User")

const user = async()=>{

    const userCreate = {
        firstName: "Sandwich",
        lastName: "Demilanesa",
        email: "demilanesa@gmail.com",
        password: "123456",
        phone: "555-22-662323"

    }

    await User.create(userCreate)

}
module.exports = user