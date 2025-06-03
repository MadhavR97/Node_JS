const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/ReactPrectice')

const db = mongoose.connection

db.once('open', (error) => {
    error ? console.log(error) : console.log('Database Connected')
})

module.exports = db

// MongoDB Atlas Database Connection

// mongoose.connect(`mongodb+srv://madhavrathod019:Madhav123@cluster0.1lmd4gz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
//     .then(() => { console.log('connected to db') })
//     .catch((err) => { console.log(err) });

// export default mongoose;