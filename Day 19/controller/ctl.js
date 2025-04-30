const schema = require('../model/schema')

module.exports.login = (req, res) => {
    res.render('login')
}

module.exports.loginData = async (req, res) => {
    res.redirect('/dashbord')
}

module.exports.dashbord = async (req, res) => {
    await schema.find({}).then((data) => {
        res.render('dashbord', { data })
    })
}

// Logout code
module.exports.logout = async (req, res) => {
    req.session.destroy()
    res.redirect('/')
}

module.exports.signup = (req, res) => {
    res.render('signup')
}

module.exports.addData = async (req, res) => {
    await schema.create(req.body).then(() => {
        res.redirect('/')
    })
}

module.exports.deleteData = async (req, res) => {
    await schema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect('/dashbord')
    })
}

