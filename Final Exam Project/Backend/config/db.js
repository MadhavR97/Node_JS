//Mongodb Atlas connection
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://madhavrathod019:Madhav123@clusterprectice.g3lctft.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPrectice')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

module.exports = mongoose;

