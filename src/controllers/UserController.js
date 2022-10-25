const CreateUser = async (req, res) => {
    res.json({
        message: 'SignUp Successful',
        user: req.user,
    });
};

module.exports = { CreateUser };
