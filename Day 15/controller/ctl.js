const schema = require('../model/firstSchema');
const fs = require('fs');

// Home Page - Show all students

module.exports.firstPage = async (req, res) => {
    try {
        const students = await schema.find({});
        res.render('index', { students });
    } catch (err) {
        res.status(500).send('Error fetching data');
    }
};

// Add new student

module.exports.addData = async (req, res) => {
    try {
        req.body.image = req.file?.path;
        await schema.create(req.body);
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error adding data');
    }
};

// Edit Page - Show single student for edit

module.exports.editPage = async (req, res) => {
    try {
        const singleData = await schema.findById(req.query.id);
        res.render('edit', { singleData });
    } catch (err) {
        res.status(500).send('Error loading edit page');
    }
};

// Update student data

module.exports.updateData = async (req, res) => {
    try {
        const singleData = await schema.findById(req.body.id);
        let img = req.file ? req.file.path : singleData.image;

        // Delete old image if new one is uploaded
        if (req.file && singleData.image) {
            fs.unlinkSync(singleData.image);
        }

        req.body.image = img;

        await schema.findByIdAndUpdate(req.body.id, req.body);
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error updating data');
    }
};

// Delete student data

module.exports.deleteData = async (req, res) => {
    try {
        const singleData = await schema.findById(req.query.id);

        if (singleData?.image) {
            fs.unlinkSync(singleData.image);
        }

        await schema.findByIdAndDelete(req.query.id);
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error deleting data');
    }
};
