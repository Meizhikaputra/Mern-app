const express = require('express')
const app = express()
const Book = require('./model/book')
const booksRoute = require('./routes/books')
const {body, validationResult, check} = require('express-validator')
const cors = require('cors')

// setting untuk request body
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// cors policy
app.use(cors())
// app.use(cors({
//   origin:'http://localhost:3000',
//   methods:['GET', 'PUT', 'POST', 'DELETE'],
//   allowedHeaders:['Content-type']
// }))

const port = 3000
require('./utils/db')



app.get('/books', async (req, res) => {
  const books = await Book.find()
  res.json(books)
})



// return detail book
app.get('/books/:id', async (req, res) => {
    const book = await Book.findById({_id : req.params.id})
    if(book ){

      res.json(book)
    } else{

      res.json({
        msg: 'data tidak ada'
      })
    }


    
});

// edit Book
app.put('/books/:id', async (req, res) => {

  const{id} = req.params
  console.log(id)
  const book = await Book.findByIdAndUpdate(id, req.body)

  if(!book) {
    return res.status(404).json('Buku tidak ada!')
  }

  res.json('berhasil merubah buku')
  
})



// add new book
app.post('/books', async (req,res) => {
  const book = await Book.insertMany(req.body)

  if(book) {
    res.json({
      data : book,
      msg : 'Berhasil menambahkan data baru'
    })
  }else {
    res.json({
      msg : 'gagal menambahkan data baru'
    })
  }

})

// delete book
app.delete('/books/:id', async (req,res) => {
  const {id} = req.params
  const book = await Book.findOneAndDelete(id)
  if(book) {
    res.json({
      msg: 'berhasil menghapus data'
    })
  }else {
    'gagal menghapus data'
  }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})