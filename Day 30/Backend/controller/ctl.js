const schema = require('../model/schema')

// GET: Fetch all data
module.exports.getData = async (req, res) => {
    try {
        const data = await schema.find({})
        res.json({ msg: 'Data fetch successfully', data })
    }
    catch (error) {
        res.json({ msg: 'Error fetching data', error })
    }
}

// POST: Add new data
module.exports.addData = async (req, res) => {
    try {
        const data = await schema.create(req.body)
        res.json({ msg: 'Data added successfully', data })
    }
    catch (error) {
        res.json({ msg: 'Error adding data', error })
    }
}

// PUT: Update existing data by ID
module.exports.updateData = async (req, res) => {
    try {
        const data = await schema.findByIdAndUpdate(req.query.id, req.body)
        res.json({ msg: 'Data updated successfully', data })
    }
    catch (error) {
        res.json({ msg: 'Error in updating Data', error })
    }
}

// DELETE: Delete data by ID
module.exports.deleteData = async (req, res) => {
    try {
        const deleteData = await schema.findByIdAndDelete(req.query.id)
        res.json({ msg: 'Data deleted successfully', deleteData })
    }
    catch (error) {
        res.json({ msg: 'Error deleting data', error })
    }
}