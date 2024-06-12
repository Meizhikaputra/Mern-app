const mongoose = require('mongoose')

const Book = mongoose.model('Book', {
    judul : {
        type : String,
        required:true
    },
    deskripsi : {
        type : String,
        required:true
    },
    tahun : {
        type : String,
        required:true
    },
})

module.exports = Book