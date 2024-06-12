const mongoose = require('mongoose');
const Book = require('../model/book');
mongoose.connect('mongodb://127.0.0.1:27017/book_express', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
});


// // // menambah 1 data
// const book1 = new Book({
//     judul: 'ASDSAD',
//     deskripsi: 'mencari bulan',
//     tahun: '2000'
// });


// // // simpan ke collections
// book1.save().then(contact => console.log(contact));


