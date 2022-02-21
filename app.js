const express = require('express')
const mysql = require('mysql')

const app = express()

// Create connection

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'scrapertestmysql'
})

// Connect
db.connect((err) => {
    if(err){
        throw err
    }
    console.log('MySQL Connected')
})

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE scrapertestmysql'
    db.query(sql, (err, result) =>{
        if(err){
            throw err
        }
        console.log(result)
        res.send('Database created')
    })
})

// Create table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))'

    db.query(sql, (err, result) => {
        if(err){
            throw err
        }
        console.log(result)
        res.send('Posts table created')
    })
})

// Insert post 1
app.get('/addpost1', (req, res) => {
    let post = {title: 'Post One', body: 'This is post 1'}
    let sql = 'INSERT INTO posts SET ?'
    let query = db.query(sql, post, (err, result) => {
        if(err){
            throw err
        }
        console.log(result)
        res.send('Post 1 added')
    })
})

// Insert post 2
app.get('/addpost2', (req, res) => {
    let post = {title: 'Post Two', body: 'This is post 2'}
    let sql = 'INSERT INTO posts SET ?'
    let query = db.query(sql, post, (err, result) => {
        if(err){
            throw err
        }
        console.log(result)
        res.send('Post 2 added')
    })
})

// Select posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts'
    let query = db.query(sql, (err, results) => {
        if(err){
            throw err
        }
        console.log(results)
        res.send('Posts fetched')
    })
})

// Select single post
app.get('/getposts/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id=${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if(err){
            throw err
        }
        console.log(result)
        res.send('Posts fetched')
    })
})

// Update posts
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated Title'
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if(err){
            throw err
        }
        console.log(result)
        res.send('Posts updated')
    })
})

// Delete posts
app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if(err){
            throw err
        }
        console.log(result)
        res.send('Post deleted')
    })
})

app.listen('3000', () => {
    console.log('Server started on port 3000')
})