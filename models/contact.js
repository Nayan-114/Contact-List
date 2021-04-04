const mongoose = require('mongoose');
const contactSchema = mongoose.Schema({
    name:
    {
        type: String,
        required:true
    },
    phone:
    {
        type: String,
        require: true
    }
});
const contact = mongoose.model('contact',contactSchema);
module.exports = contact;