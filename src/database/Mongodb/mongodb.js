const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://root:Hyg57aff@vinci.ujdc9.mongodb.net/Vinci', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.on('open', () => console.log('Connected to the Mongoose Database.'));