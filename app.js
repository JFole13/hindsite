const express = require('express')
const mysql = require('mysql')

const {Team} = require("./parseEspnData.js")

const app = express()

// Create connection

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'espn_db'
})

// Connect
db.connect((err) => {
    if(err) throw err
    console.log('MySQL Connected')
})

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE espn_db'
    db.query(sql, (err, result) =>{
        if(err) throw err
        console.log(result)
        res.send('Database created')
    })
})

// Create table
app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE nhl_data(id int AUTO_INCREMENT, team_name VARCHAR(255), record VARCHAR(255), PRIMARY KEY (id))'

    db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send('Posts table created')
    })
})

// // Create table
// app.get('/createteamtable/:name', (req, res) => {
//     let sql = `CREATE TABLE ${req.params.name}(id int AUTO_INCREMENT, name VARCHAR(255), record VARCHAR(255), PRIMARY KEY (id))`

//     db.query(sql, (err, result) => {
//         if(err) throw err
//         console.log(result)
//         res.send('Table created')
//     })
// })

// Select posts
app.get('/getteams', (req, res) => {
    let sql = 'SELECT * FROM nhl_data'
    let query = db.query(sql, (err, results) => {
        if(err) throw err
        console.log(results)
        res.send('Posts fetched')
    })
})

// Select single post
app.get('/getteam/:id', (req, res) => {
    let sql = `SELECT * FROM nhl_data WHERE id=${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send('Post fetched')
    })
})

// Update posts
app.get('/updateteam/:name', (req, res) => {
    let newRecord = Team.record
    let sql = `UPDATE nhl_data SET record = '${newRecord}' WHERE team_name= '${req.params.name}'`
    let query = db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send('Post updated')
    })
})

app.listen('3000', () => {
    console.log('Server started on port 3000')
})