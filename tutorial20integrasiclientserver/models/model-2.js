// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    komentar:  {
        type: String,
        required: true
    },
    pembuat:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// create a schema
var dishSchema = new Schema({
    nama: {
        type: String,
        required: true,
        unique: true
    },
    foto_profil: {
        type: String
    },
    kategori: {
        type: String
    },
    label: {
        type: String
    },
    harga: {
        type: String
    },
    deskripsi: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default:false
    },
    komentar:[commentSchema]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Dishes = mongoose.model('tabel2', dishSchema);

// make this available to our Node applications
module.exports = Dishes;