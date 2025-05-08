//Install connect-flash node module
//npm i connect-flash

module.exports.setFlash = (req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg')
    next();
}
