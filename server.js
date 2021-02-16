const express = require("express")
const app = express()
const { Book } = require('./models')
port = 3000


app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


//get all books
app.get('/books', (req, res) => {
    Book.findAll()
        .then(result => {
            res.status(200).json({
                status: "success",
                data: result
            })
        })
})

// get book by id findone
app.get('/books/:id', (req, res) => {
    Book.findOne({
            where: { id: req.params.id }
        })
        .then(result => {
            if (result !== null) {
                res.status(200).json({
                    status: "success",
                    data: result
                })
            } else {
                res.status(200).json({
                    status: "success",
                    message: "Data not found!",
                    data: result
                })
            }
        })
})

//post book
app.post('/books', (req, res) => {
    Book.create({
            isbn: req.body.isbn,
            judul: req.body.judul,
            sinopsis: req.body.sinopsis,
            penulis: req.body.penulis,
            genre: req.body.genre
        })
        .then(() => {
            res.status(201).json({
                status: "success",
                message: "Create actor success!"
            })
        })
})

app.put('/books/:id', (req, res) => {
    Book.update({
            isbn: req.body.isbn,
            judul: req.body.judul,
            sinopsis: req.body.sinopsis,
            penulis: req.body.penulis,
            genre: req.body.genre
        }, {
            where: { id: req.params.id }
        })
        .then(() => {
            res.status(201).json({
                status: "success",
                message: "Update actor success!"
            })
        })
})

app.delete('/books/:id', (req, res) => {
    Book.destroy({
            where: { id: req.params.id }
        })
        .then(() => {
            res.status(200).json({
                status: "success",
                message: "Delete actor success!"
            })
        })
})

app.listen(port, () => console.log(`server berjalan di ${port}`))