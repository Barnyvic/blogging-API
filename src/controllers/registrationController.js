const UserModel = require('../Model/UserModel');

const registerUser = async (req, res) => {
    const { email, password, firstname, lastname, username, confirmPassword } =
        req.body;

    if (
        !email ||
        !password ||
        !firstname ||
        !lastname ||
        !username ||
        !confirmPassword
    ) {
        return res.send({ message: 'Fill empty fields' });
    }

    if (password !== confirmPassword) {
        return res.send({ message: 'PassWord must Match' });
    }

    try {
        const user = await UserModel.create({
            Email: email,
            Password: password,
            First_Name: firstname,
            Last_Name: lastname,
            Username: username,
        });
        return res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message,
        });
    }
};

module.exports = { registerUser };
